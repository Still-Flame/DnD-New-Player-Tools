#!/bin/bash
# $1 pdf  $2 first  $3 last  $4 out  $5 width(page pts)
PDF="$1"; F="$2"; L="$3"; OUT="$4"; W="${5:-612}"; H="${6:-792}"
HALF=$((W/2))
: > "$OUT"
for ((p=F;p<=L;p++)); do
  echo "@@PAGE $p" >> "$OUT"
  pdftotext -layout -f $p -l $p -x 0 -y 0 -W $HALF -H $H "$PDF" - 2>/dev/null >> "$OUT"
  pdftotext -layout -f $p -l $p -x $HALF -y 0 -W $HALF -H $H "$PDF" - 2>/dev/null >> "$OUT"
done
