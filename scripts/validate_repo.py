from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"

errors = []

foundation = [
    DOCS / "foundation" / "CIAP-0000-Meta-Model.md",
    DOCS / "foundation" / "CIAP-0001-Constitution.md",
    DOCS / "foundation" / "CIAP-0002-Terminology.md",
    DOCS / "foundation" / "CIAP-0003-Product-Boundary.md",
    DOCS / "foundation" / "CIAP-0004-Design-Principles.md",
]

for f in foundation:
    if not f.exists():
        errors.append(f"missing foundation document: {f.relative_to(ROOT)}")

ids = {}
for f in DOCS.rglob("*.md"):
    text = f.read_text(encoding="utf-8")
    match = re.search(r"^document_id:\s*(.+)$", text, re.MULTILINE)
    if match:
        doc_id = match.group(1).strip()
        if doc_id in ids:
            errors.append(
                f"duplicate document_id {doc_id}: "
                f"{ids[doc_id].relative_to(ROOT)} and {f.relative_to(ROOT)}"
            )
        ids[doc_id] = f

if errors:
    print("CIAP repository validation failed:")
    for e in errors:
        print(f"- {e}")
    sys.exit(1)

print(f"Validation passed. Documents with IDs: {len(ids)}")
