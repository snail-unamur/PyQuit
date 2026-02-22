import ast
from rules.PY001_numpy_array import NumpyArrayRule

def analyze_code(code: str):
    tree = ast.parse(code)

    rule = NumpyArrayRule()
    rule.visit(tree)

    return rule.diagnostics
