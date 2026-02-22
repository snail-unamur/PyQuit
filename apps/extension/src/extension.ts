import * as vscode from "vscode";
import { execFile } from "node:child_process";
import { ruleMap } from "@pyquit/rules";
import * as path from "node:path";

let collection: vscode.DiagnosticCollection;

export function activate(context: vscode.ExtensionContext) {
  collection = vscode.languages.createDiagnosticCollection("py-optimize");
  context.subscriptions.push(collection);

  const analyzerPath = path.join(
    context.extensionPath,
    "..",
    "analyzer",
    "src",
    "main.py",
  );

  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument((doc) =>
      runLint(doc, collection, analyzerPath),
    ),
    vscode.workspace.onDidOpenTextDocument((doc) =>
      runLint(doc, collection, analyzerPath),
    ),
  );
}

async function runLint(
  document: vscode.TextDocument,
  collection: vscode.DiagnosticCollection,
  analyzerPath: string,
) {
  if (document.languageId !== "python") return;

  const pythonExtension = vscode.extensions.getExtension("ms-python.python");
  if (!pythonExtension) {
    console.error("PyQuit: Python extension not found.");
    return;
  }

  const api = await pythonExtension.activate();
  const pythonPath =
    api.settings.getExecutionDetails(document.uri).execCommand?.[0] ?? "python";

  execFile(pythonPath, [analyzerPath, document.fileName], (err, stdout) => {
    if (err) {
      console.error("PyQuit Execution Error:", err);
      return;
    }

    if (document.isClosed) return;

    try {
      const results = JSON.parse(stdout);
      const diagnostics: vscode.Diagnostic[] = results.map((r: any) => {
        const rule = ruleMap[r.rule_id];

        // Calculate underline range
        const start = new vscode.Position(r.line - 1, r.column);
        const end = new vscode.Position(r.end_line - 1, r.end_column);

        const range = new vscode.Range(start, end);

        const diagnostic = new vscode.Diagnostic(
          range,
          rule?.title || `Optimization suggestion (${r.rule_id})`,
          vscode.DiagnosticSeverity.Information,
        );

        if (rule?.docsPath) {
          try {
            const formattedPath = rule.docsPath
              .replaceAll("\\", "/")
              .replace(/^[a-zA-Z]:/, "")
              .replace(/^\/?/, "/");

            diagnostic.code = {
              value: r.rule_id,
              target: vscode.Uri.from({
                scheme: "http",
                authority: "localhost:3001",
                path: formattedPath.toLowerCase(),
              }),
            };
          } catch (error_) {
            diagnostic.code = r.rule_id;
          }
        } else {
          diagnostic.code = r.rule_id;
        }

        return diagnostic;
      });

      collection.set(document.uri, diagnostics);
    } catch (error_) {
      console.error("PyQuit: JSON Parse Error. Output was:", stdout);
    }
  });
}

export function deactivate() {
  if (collection) {
    collection.clear();
    collection.dispose();
  }
}
