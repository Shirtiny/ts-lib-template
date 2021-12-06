# ts-lib-template

> [Ts-lib-template](https://github.com/Shirtiny/ts-lib-template) A starter template for typescript library.

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
const { MY_ENV, PORT, NODE_ENV, npm_package_name } = process.env;

// the customized ENV， just pick what you need
const env = {
  MY_ENV,
  PORT,
  NODE_ENV,
  npm_package_name,
};

module.exports = {
  // your lib global name
  globalName: "tsLibTemplate",
  // the output prefix name， default is 'main', please check your package.json after this option changed.
  outputFileName: "main",
  // devServer option
  devServer: {
    host: HOST || "localhost",
    port: PORT || 2021,
    proxy: {
      "^/api": {
        target: "http://192.168.0.123:1234",
        pathRewrite: { "^/api": "" },
      },
    },
  },
  // jsx options direct set to esbuild
  jsxFactory: "React.createElement",
  jsxFragment: "React.Fragment",
  // if env is false, default is all process env
  env,
};
```

## Acknowledgment

[raulanatol / template-ts-package](https://github.com/raulanatol/template-ts-package)

## License

The MIT License (MIT)
