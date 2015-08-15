#!/bin/bash 

git checkout development
git pull origin development
git merge $1
read -r -p "Keep going? [Y/n]" response
response=${response,,} # tolower
if [[ $response =~ ^(yes|y| ) ]]; then
git push
git checkout $1
git pull origin development
fi
