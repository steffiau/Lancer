#!/bin/bash 

git checkout development
git pull origin development
git merge $1
git push
git checkout $1
git pull origin development
