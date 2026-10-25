#!/usr/bin/env bash
# Construye en una carpeta la web tal como se publica: solo los archivos de la lista blanca de
# .vercelignore (sintaxis de .gitignore), sin vercel.json ni el panel (/admin, que solo va en Vercel).
# Lo usan los workflows de GitHub (Arsys y Pages), así que las dos publicaciones salen de la misma
# lista. También vale en local con Git Bash. Copia lo que hay en la carpeta de los archivos que
# git sigue: un archivo nuevo tiene que estar al menos en el índice (git add) para entrar.
# El .htaccess no entra (la lista blanca lo deja fuera de Vercel): el workflow de Arsys lo añade aparte.
# Uso: bash herramientas/construir-web.sh <carpeta-destino>
set -euo pipefail
export LC_ALL=C

[ $# -eq 1 ] || { echo "Uso: bash herramientas/construir-web.sh <carpeta-destino>" >&2; exit 2; }
raiz="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$1"
destino="$(cd "$1" && pwd)"
# la carpeta se vacía antes de construir: nunca la raíz del repositorio ni una carpeta que la contenga
case "$raiz/" in "$destino"/*) echo "Destino no válido: $destino" >&2; exit 2 ;; esac

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
cd "$raiz"
git ls-files -z | sort -z > "$tmp/all.lst"
git ls-files -z --cached --ignored --exclude-from=.vercelignore | sort -z > "$tmp/excluded.lst"
comm -z -23 "$tmp/all.lst" "$tmp/excluded.lst" > "$tmp/site.lst"

find "$destino" -mindepth 1 -delete
tar --null --verbatim-files-from --files-from="$tmp/site.lst" -cf - | tar -xf - -C "$destino"
rm -f "$destino/vercel.json"
# El panel (/admin) solo va en Vercel: en nafergu75.github.io compartiría origen (y la clave
# guardada en el navegador) con las demás webs de la cuenta, y en Arsys no hace falta.
rm -rf "$destino/admin"
test -f "$destino/index.html"

bad="$(cd "$destino" && find . -type f \( -name 'server.js' -o -name 'worker.js' -o -name '*.ps1' -o -name '*.bat' -o -name '*.exe' \
  -o -name '*.pdf' -o -name '*.doc' -o -name '*.docx' -o -name '*.xls' -o -name '*.xlsx' -o -path '*/.*' \) -print)"
if [ -n "$bad" ]; then
  echo "::error::Han entrado en la web archivos que no se deben publicar:"
  echo "$bad"
  exit 1
fi
echo "Web construida en $destino: $(find "$destino" -type f | wc -l) archivos, $(du -sh "$destino" | cut -f1)"
