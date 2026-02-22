from dataclasses import dataclass

@dataclass
class Diagnostic:
    rule_id: str
    message: str
    line: int
    column: int
    end_line: int
    end_column: int
