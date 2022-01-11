npm run build
npm run generate

cd ..

cp -rT src/dist docs/
git add .
git commit -m "Deploy"
