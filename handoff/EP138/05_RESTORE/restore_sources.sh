#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
RESTORE="$ROOT/handoff/EP138/05_RESTORE"
MASTER_DIR="$ROOT/handoff/EP138/01_CURRENT_MASTER"
REF_DIR="$ROOT/handoff/EP138/02_REFERENCE"

mkdir -p "$MASTER_DIR" "$REF_DIR"

# EP138: complete program source with only large embedded media payloads replaced by explicit placeholders.
base64 --decode "$RESTORE/EP138_H5_V1_2_2_BGM_FIX_SOURCE_ONLY.html.gz.b64" \
  | gzip -dc \
  > "$MASTER_DIR/EP138_H5_V1_2_2_BGM_FIX_SOURCE_ONLY.html"

# EP128 reference: same treatment; complete program source, media payloads omitted only.
cat "$RESTORE"/ep128_source_only.part*.b64 \
  | base64 --decode \
  | gzip -dc \
  > "$REF_DIR/EP128_H5_V1_2_UI_MOTION_SYSTEM_REBUILD_SOURCE_ONLY.html"

MASTER_SHA="$(sha256sum "$MASTER_DIR/EP138_H5_V1_2_2_BGM_FIX_SOURCE_ONLY.html" | awk '{print $1}')"
REF_SHA="$(sha256sum "$REF_DIR/EP128_H5_V1_2_UI_MOTION_SYSTEM_REBUILD_SOURCE_ONLY.html" | awk '{print $1}')"

EXPECTED_MASTER="a21766449ab4a065abe4aa2bf72c02752685d62f5021d6f22e1a2ebbcf398040"
EXPECTED_REF="21e54911536c795772812389e1ccb587a9c16012552fcb16e5dc15bf607b0ee4"

if [[ "$MASTER_SHA" != "$EXPECTED_MASTER" ]]; then
  echo "EP138 source hash mismatch: $MASTER_SHA" >&2
  exit 1
fi

if [[ "$REF_SHA" != "$EXPECTED_REF" ]]; then
  echo "EP128 source hash mismatch: $REF_SHA" >&2
  exit 1
fi

echo "Restored and verified:"
echo "  $MASTER_DIR/EP138_H5_V1_2_2_BGM_FIX_SOURCE_ONLY.html"
echo "  sha256=$MASTER_SHA"
echo "  $REF_DIR/EP128_H5_V1_2_UI_MOTION_SYSTEM_REBUILD_SOURCE_ONLY.html"
echo "  sha256=$REF_SHA"
