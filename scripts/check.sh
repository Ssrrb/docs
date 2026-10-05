#!/bin/sh
# Verifies the rules of this repository that a machine can verify.
# The commit hook runs this file. The workflow runs this file.
# The author changes the limit in this file.

set -eu

# The largest number of words that AGENTS.md may hold.
limit=1950

# The file that holds the limit.
file=AGENTS.md

if [ ! -f "$file" ]; then
  printf 'check: the file %s does not exist\n' "$file" >&2
  exit 1
fi

count=$(wc -w < "$file" | awk '{ print $1 }')

if [ "$count" -gt "$limit" ]; then
  printf 'check: %s holds %s words. The limit is %s.\n' "$file" "$count" "$limit" >&2
  printf 'check: remove words. Do not remove a rule.\n' >&2
  exit 1
fi

printf 'check: %s holds %s words. The limit is %s.\n' "$file" "$count" "$limit"
