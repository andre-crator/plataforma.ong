#!/usr/bin/env bash
set -e
REPO_URL="${1:-https://github.com/andre-crator/plataforma.ong.git}"
BRANCH="${2:-main}"
git init
git add .
git commit -m "Versão final comentada e acessível" || true
git branch -M "$BRANCH" || true
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO_URL"
git pull --rebase origin "$BRANCH" --allow-unrelated-histories || true
git push -u origin "$BRANCH"
