#!/usr/bin/env bash
set -euo pipefail

npm run build
npm run generate

cd ..

rm -rf docs
mkdir -p docs
echo www.faller.com.uy > docs/CNAME
cp -R src/dist/. docs/

git add .
git commit -m "Deploy - ${1:-$(date +%Y-%m-%d)}"
git push
