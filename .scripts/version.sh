#!/bin/sh

# set -e

error() {
  echo "🚨 $1"
  exit 1
}

package_version() {
  echo "Set Package Version $1"
  yarn version --new-version "$1"

}

git_commit() {
  echo "Run git"
  git add .
  git status
  git commit || true
}

NEW_VERSION=$1

if [ -z "$NEW_VERSION" ]; then
  while true; do
    echo "Specify an version increase (patch minor major no) "
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
    no)
      NEW_VERSION="no"
      break
      ;;
    *)
      echo "Only patch minor or major, please."
      ;;
    esac
  done
fi

if [ $NEW_VERSION != "no" ]; then
  package_version $NEW_VERSION
  git_commit
fi
