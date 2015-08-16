#!/bin/bash 

git checkout development
git pull origin development
git merge $1

read -n1 -r -p "Press space to continue..." key

if [ "$key" = ' ' ]; then
git push
git checkout $1
git pull origin development
fi
