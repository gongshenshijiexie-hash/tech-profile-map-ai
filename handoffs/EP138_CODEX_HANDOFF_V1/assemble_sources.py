#!/usr/bin/env python3
from pathlib import Path
root=Path(__file__).resolve().parent
parts=sorted(root.glob("EP138_SOURCE.part*.txt"))
if not parts: raise SystemExit("No EP138 source parts")
out=root/"EP138_H5_V1_2_2_BGM_FIX_CODEX_SOURCE.html"
out.write_text("".join(p.read_text() for p in parts))
print(out)
