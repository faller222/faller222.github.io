npm run build
npm run generate

cd ..

cp -r src/dist/* docs/
git add .
git commit -m "Deploy"
