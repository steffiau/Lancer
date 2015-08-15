#!/bin/bash 

git checkout development
git pull origin development
git merge $1
read -p "Continue? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
git push
git checkout $1
git pull origin development
fi
