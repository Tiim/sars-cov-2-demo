#!/usr/bin/env sh

# abort on errors
set -e

echo Building. this may take a minute...
npm run build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://tiim.github.io
git push -f git@github.com:Tiim/sars-cov-2-demo.git master:gh-pages

cd -