#!/bin/bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
VIDEO_DIR="$ROOT/ep139/assets/video"
AUDIO_DIR="$ROOT/ep139/assets/audio"
SRC_ROOT="$HOME/Desktop/es01"

ES01_SRC="$SRC_ROOT/ES01/ES01.mp4"
ES02_SRC="$SRC_ROOT/ES02/ES02.mp4"
ES03_SRC="$SRC_ROOT/EP139_ES01_SHANGHAI_TO_LUJIAZUI/ES03.mp4"
ES04_SRC="$SRC_ROOT/ES04/ES04.mp4"

mkdir -p "$VIDEO_DIR" "$AUDIO_DIR"

for f in "$ES01_SRC" "$ES02_SRC" "$ES03_SRC" "$ES04_SRC"; do
  if [ ! -f "$f" ]; then
    echo "Missing video: $f"
    exit 1
  fi
done

cp "$ES01_SRC" "$VIDEO_DIR/ES01.mp4"
cp "$ES02_SRC" "$VIDEO_DIR/ES02.mp4"
cp "$ES04_SRC" "$VIDEO_DIR/ES04.mp4"

# Normalize ES03 to 720x1280 if ffmpeg is available. If already 720 wide, copy directly.
if command -v ffmpeg >/dev/null 2>&1 && command -v ffprobe >/dev/null 2>&1; then
  WIDTH="$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$ES03_SRC")"
  if [ "$WIDTH" = "720" ]; then
    cp "$ES03_SRC" "$VIDEO_DIR/ES03.mp4"
  else
    ffmpeg -y -i "$ES03_SRC" -vf "crop=720:1280:(iw-720)/2:0" -c:v libx264 -crf 18 -preset medium -pix_fmt yuv420p -an "$VIDEO_DIR/ES03.mp4"
  fi
else
  cp "$ES03_SRC" "$VIDEO_DIR/ES03.mp4"
fi

VOICE_SRC="$(find "$HOME/Desktop" "$HOME/Downloads" -maxdepth 5 -type f \( -name 'MiniMax_2026-09-01_10_24_34_衡迟的声音2.wav' -o -name 'MiniMax_2026-09-01_10_24_34_衡迟的声音2 (1).wav' -o -name 'EP139_VOICE_MASTER.wav' \) -print -quit 2>/dev/null || true)"

if [ -z "$VOICE_SRC" ]; then
  echo "Voice WAV not found in Desktop or Downloads. Put the WAV in either location and run this script again."
  exit 1
fi

cp "$VOICE_SRC" "$AUDIO_DIR/EP139_VOICE_MASTER.wav"

echo "Asset check:"
ls -lh "$VIDEO_DIR"/ES01.mp4 "$VIDEO_DIR"/ES02.mp4 "$VIDEO_DIR"/ES03.mp4 "$VIDEO_DIR"/ES04.mp4 "$AUDIO_DIR"/EP139_VOICE_MASTER.wav

git checkout ep139
git add ep139/assets/video/ES01.mp4 ep139/assets/video/ES02.mp4 ep139/assets/video/ES03.mp4 ep139/assets/video/ES04.mp4 ep139/assets/audio/EP139_VOICE_MASTER.wav
git commit -m "EP139: add Earth Studio videos and voice master" || true
git push origin ep139

echo "EP139 binary assets pushed to GitHub branch ep139."
