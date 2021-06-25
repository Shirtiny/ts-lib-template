#!/bin/sh
###
# @Author: Shirtiny
# @Date: 2021-06-11 10:01:14
 # @LastEditTime: 2021-06-25 14:39:31
# @Description:
###

set -e

error() {
  echo "🚨 $1"
  exit 1
}

is_valid_version() {
  case $1 in
  patch) ;;
  minor) ;;
  major) ;;
  *) error "🚨 Invalid version >> $1" ;;
  esac
}

assert_ready_to_publish() {
  # is_valid_version "$1"
  if [ ! -d dist ]; then
    error "Need build first"
  fi
}

# prepare_folder() {
#   echo "Cleanup folders to publish"
#   find dist/tsc -type f -name '*.js' -print -delete
#   find dist/tsc -type f -name '*.js.map' -print -delete
#   mv dist/tsc dist/types
# }

publish() {
  echo "Publish"
  echo "Confirm version"
  yarn publish --access public
  git push --tags
  git push
}

assert_ready_to_publish
# prepare_folder
publish
