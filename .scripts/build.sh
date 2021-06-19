#!/bin/sh

set -eu

yarn build
yarn esbuild-node
yarn esbuild-browser
