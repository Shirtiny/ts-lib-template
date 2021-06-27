#!/bin/sh

set -eu

yarn build
rm -rf tsc
