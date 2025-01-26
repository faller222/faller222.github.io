nvm install 22.13
node -v

npm run generate

rm -rf ../docs/L
cp -r .output/public ../docs/L
git add ../docs/L

rm -rf ../src/static/L
cp -r .output/public ../src/static/L
git add ../src/static/L

