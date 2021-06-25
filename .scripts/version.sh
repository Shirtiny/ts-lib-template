#!/bin/sh

###
# @Author: Shirtiny
# @Date: 2021-06-25 12:13:58
 # @LastEditTime: 2021-06-25 14:28:58
# @Description:
###

set -e

error() {
  echo "🚨 $1"
  exit 1
}

version() {
  echo "Set Version $1"
  yarn version --new-version "$1"
  git add .
  git status
  git commit -m "$1"
}

NEW_VERSION=$1

if [ -z "$NEW_VERSION" ]; then
  while true; do
    echo "Specify an version increase (patch minor major) "
    read -r answer
    case $answer in
    patch)
      NEW_VERSION="patch"
      break
      ;;
    minor)
      NEW_VERSION="minor"
      break
      ;;
    major)
      NEW_VERSION="major"
      break
      ;;
    *)
      echo "Only patch minor or major, please."
      ;;
    esac
  done
fi

version $NEW_VERSION
