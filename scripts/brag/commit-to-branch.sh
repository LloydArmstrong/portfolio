#!/usr/bin/env bash
# Commit files from a staging directory onto branch brag/<YYYY-MM> WITHOUT
# touching the current checkout, index or working tree.
#
#   scripts/brag/commit-to-branch.sh 2026-10 /path/to/staging
#
# Every file under <staging> is written to the same relative path in the repo
# (e.g. <staging>/content/brag/2026/2026-10-foo.md). Re-running for the same
# month adds a new commit on top of the existing branch.
set -euo pipefail

month="$1"
staging="$(cd "$2" && pwd)"
[[ "$month" =~ ^[0-9]{4}-[0-9]{2}$ ]] || { echo "month must be YYYY-MM" >&2; exit 1; }

cd "$(git rev-parse --show-toplevel)"
branch="brag/$month"

if git rev-parse -q --verify "refs/heads/$branch" >/dev/null; then
  base="$(git rev-parse "refs/heads/$branch")"
elif git rev-parse -q --verify refs/remotes/origin/main >/dev/null; then
  base="$(git rev-parse refs/remotes/origin/main)"
else
  base="$(git rev-parse refs/heads/main)"
fi

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
export GIT_INDEX_FILE="$tmp/index"
git read-tree "$base"

count=0
while IFS= read -r -d '' f; do
  rel="${f#"$staging"/}"
  blob="$(git hash-object -w -- "$f")"
  git update-index --add --cacheinfo "100644,$blob,$rel"
  echo "  + $rel"
  count=$((count + 1))
done < <(find "$staging" -type f -print0 | sort -z)

[[ $count -gt 0 ]] || { echo "nothing to commit" >&2; exit 1; }

tree="$(git write-tree)"
export GIT_AUTHOR_NAME="${GIT_AUTHOR_NAME:-$(git log -1 --format=%an HEAD)}"
export GIT_AUTHOR_EMAIL="${GIT_AUTHOR_EMAIL:-$(git log -1 --format=%ae HEAD)}"
export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME" GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
commit="$(git commit-tree "$tree" -p "$base" -m "Brag: $month" -m "Drafted by the monthly brag run. Review, edit, merge.")"
git update-ref "refs/heads/$branch" "$commit"
echo "branch $branch -> $(git rev-parse --short "$commit") ($count files)"
