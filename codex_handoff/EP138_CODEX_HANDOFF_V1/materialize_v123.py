from pathlib import Path
import base64
import gzip
import hashlib

ROOT = Path(__file__).resolve().parent
PAYLOAD = ROOT / "EP138_V123_FULL_SOURCE.html.gz.b64"
OUTPUT = ROOT / "EP138_H5_V1_2_3_SUBTITLE_EMPHASIS_FIX.html"
EXPECTED_SHA256 = "de85449a31fd0ee511b8dd3e8fcd10562595f3de767a25799d080472c9bf7ef5"

data = gzip.decompress(base64.b64decode(PAYLOAD.read_text().strip()))
actual = hashlib.sha256(data).hexdigest()
if actual != EXPECTED_SHA256:
    raise SystemExit(f"SHA256 mismatch: {actual}")
OUTPUT.write_bytes(data)
print(f"Wrote {OUTPUT.name} ({len(data)} bytes) SHA256={actual}")
