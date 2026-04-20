#!/usr/bin/env bash
set -eu

ROOT_DIR="$(cd -- "$(dirname -- "$0")/.." && pwd)"
OUT_FILE="$ROOT_DIR/styles/google.css"
URL='https://fonts.googleapis.cn/css2?family=Dancing+Script:wght@400..700&family=Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900&family=Noto+Sans+SC:wght@100..900&family=Oswald:wght@200..700&family=Victor+Mono:ital,wght@0,100..700;1,100..700&display=swap'
USER_AGENT='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36'

TMP_FILE="$(mktemp)"
cleanup() {
  rm -f "$TMP_FILE"
}
trap cleanup EXIT INT TERM

curl \
  --fail \
  --show-error \
  --location \
  --user-agent "$USER_AGENT" \
  "$URL" > "$TMP_FILE"

if [ ! -s "$TMP_FILE" ]; then
  echo 'Google Fonts response is empty; refusing to overwrite styles/google.css' >&2
  exit 1
fi

if cmp -s "$TMP_FILE" "$OUT_FILE"; then
  echo 'styles/google.css is already up to date.'
else
  mv "$TMP_FILE" "$OUT_FILE"
  echo 'Updated styles/google.css from Google Fonts API.'
fi

git add "$OUT_FILE"
echo 'Staged styles/google.css.'
