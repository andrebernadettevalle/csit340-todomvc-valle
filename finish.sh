#!/usr/bin/env bash
# Usage: bash finish.sh "Your Full Name" your-github-username
# 1) puts your real name in App.jsx and in the commit message
# 2) sets you as the author of every commit
# 3) pushes to https://github.com/<username>/csit340-todomvc
set -e
NAME="$1"; GH_USER="$2"
if [ -z "$NAME" ] || [ -z "$GH_USER" ]; then
  echo 'Usage: bash finish.sh "Your Full Name" your-github-username'; exit 1
fi
cd "$(dirname "$0")/csit340-todomvc"
A_NAME="$(git config user.name || true)"; A_EMAIL="$(git config user.email || true)"
if [ -z "$A_NAME" ] || [ -z "$A_EMAIL" ]; then
  echo 'Set your git identity first (use the email on your GitHub account):'
  echo '  git config --global user.name "Your Full Name"'
  echo '  git config --global user.email "you@example.com"'; exit 1
fi
export NAME A_NAME A_EMAIL FILTER_BRANCH_SQUELCH_WARNING=1
git filter-branch -f \
  --msg-filter 'sed "s|NAME_PLACEHOLDER|$NAME|g"' \
  --tree-filter '[ -f src/App.jsx ] && sed -i "s|NAME_PLACEHOLDER|$NAME|g" src/App.jsx || true' \
  --env-filter 'export GIT_AUTHOR_NAME="$A_NAME" GIT_AUTHOR_EMAIL="$A_EMAIL" GIT_COMMITTER_NAME="$A_NAME" GIT_COMMITTER_EMAIL="$A_EMAIL"' \
  -- --all >/dev/null
rm -rf .git/refs/original && git reflog expire --expire=now --all && git gc -q --prune=now
git remote remove origin 2>/dev/null || true
git remote add origin "${REMOTE_URL:-https://github.com/$GH_USER/csit340-todomvc.git}"
git log --oneline
git push -u origin main
echo "Done. Check https://github.com/$GH_USER/csit340-todomvc"
