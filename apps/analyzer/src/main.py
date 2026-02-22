import sys
import json
from engine.analyzer import analyze_code

if __name__ == "__main__":
    file_path = sys.argv[1]

    with open(file_path, "r") as f:
        code = f.read()

    diagnostics = analyze_code(code)

    print(json.dumps([d.__dict__ for d in diagnostics]))
