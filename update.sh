#!/bin/bash 

git checkout development
git pull origin development
git merge $1
read -r -p "Are you sure? [y/N] " response
if [[ $response =~ ^([yY][eE][sS]|[yY])$ ]]
then
git push
git checkout $1
git pull origin development
fi
