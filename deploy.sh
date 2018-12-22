#!/bin/bash
set -ev # exit with nonzero exit code if anything fails

# clear the output directory
rm -rf dist || exit 0;

# generate the files
yarn generate
yarn build

# go to the out directory and create a *new* Git repo
cd dist
git init

# The first and only commit to this new Git repo contains all the
# files present with the commit message "Deploy to GitHub Pages".
git add .
git commit -m "Deploy to GitHub Pages"

# Force push from the current repo's master branch to the remote
# repo. (All previous history on the branch will be lost, since we are
# overwriting it.) We redirect any output to /dev/null to hide any sensitive
# credential data that might otherwise be exposed.
git push --force --quiet git@github.com:ChicagoChinese/awesome-chinese-webcomics.git master:gh-pages > /dev/null 2>&1
