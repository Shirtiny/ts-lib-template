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

This is a template for typescript library base on parcel. This template includes followings:

- TypeScript

- Parcel

- Makefile

- Dev server

- Env

- Prettier

- Eslint

- Jest

- Github action

## Usage

Create your repository by clicking 'Use this template' top of the page. Then, check the package.json file.

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
  // devServer option
  devServer: {
    host: HOST || "localhost",
    port: PORT || 2021,
  },
  // if env is false, default is all process env
  env,
};
```

```jsonc
// .proxyrc
{
  "/api": {
    "target": "http://localhost:8000/",
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```

## Acknowledgment

[raulanatol / template-ts-package](https://github.com/raulanatol/template-ts-package)

## License

The MIT License (MIT)
