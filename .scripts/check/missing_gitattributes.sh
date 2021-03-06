#!/bin/sh

set -eu

missing_attributes=$(git ls-files | git check-attr -a --stdin | grep "text: auto")
if [[ "$missing_attributes" ]]; then
  echo ".gitattributes rule missing for the following files:";
  echo "$missing_attributes";
else
  echo "All files have a corresponding rule in .gitattributes";
fi
