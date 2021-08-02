# ts-lib-template

> A starter template for typescript library.

```shell
# init project
yarn
# build
yarn build

# tag and version
make version
# publish to npm
make publish

# dev
yarn start
```

## Introduction

This is a template for typescript library base on esbuild. This template includes followings:

- TypeScript

- Esbuild

- Makefile

- Dev server

- Env

- Prettier

- Eslint

- Jest

- Sass/scss & Autoprefixer

- Github action

## Usage

Create your repository by clicking 'Use this template' top of the page.

## Config

```js
// .sh.js
module.exports = {
  // your lib global name
  globalName: "tsLibTemplate",
  // devServer option
  devServer: {
    host: "localhost",
    port: 2021,
    proxy: {
      "^/api": {
        target: "http://192.168.6.111:9780",
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
```

## Acknowledgment

[raulanatol / template-ts-package](https://github.com/raulanatol/template-ts-package)

## License

The MIT License (MIT)
