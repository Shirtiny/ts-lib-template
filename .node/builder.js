/*
 * @Author: Shirtiny
 * @Date: 2021-06-26 17:41:22
 * @LastEditTime: 2021-07-12 09:44:48
 * @Description:
 */
const esbuild = require("esbuild");
const childProcess = require("child_process");
const path = require("path");
const { sassPlugin } = require("esbuild-sass-plugin");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const postcssPresetEnv = require("postcss-preset-env");
const { config, isDev } = require("./var");
const logger = require("./logger");

const srcDirPath = "../src";
const distDirPath = "../dist";

const createFilePath = (dirPath, fileName) => {
  return path.resolve(__dirname, `${dirPath}/${fileName}`);
};

const buildList = [
  {
    entryPoints: [createFilePath(srcDirPath, "browser.ts")],
    platform: "browser",
    outfile: createFilePath(distDirPath, "main.browser.js"),
    plugins: [
      sassPlugin({
        async transform(source) {
          const { css } = await postcss([
            autoprefixer,
            postcssPresetEnv({ stage: 0 }),
          ]).process(source, { from: undefined });
          return css;
        },
      }),
    ],
    loader: {
      ".svg": "dataurl",
    },
  },
  {
    entryPoints: [createFilePath(srcDirPath, "es.ts")],
    platform: "neutral",
    outfile: createFilePath(distDirPath, "main.es.js"),
    plugins: [
      sassPlugin({
        async transform(source) {
          const { css } = await postcss([
            autoprefixer,
            postcssPresetEnv({ stage: 0 }),
          ]).process(source, { from: undefined });
          return css;
        },
      }),
    ],
    loader: {
      ".svg": "dataurl",
    },
  },
  {
    entryPoints: [createFilePath(srcDirPath, "cli.ts")],
    platform: "node",
    outfile: createFilePath(distDirPath, "cli.js"),
    plugins: [],
  },
];

const build = async ({ entryPoints = [], platform, outfile, plugins = [] }) => {
  try {
    await esbuild.build({
      entryPoints,
      platform,
      globalName: config.globalName,
      bundle: true,
      minify: !isDev,
      sourcemap: isDev ? "both" : false,
      outfile,
      plugins,
    });
    childProcess.execSync("tsc");
    logger.chan("Building", [entryPoints.join("; ")], outfile);
  } catch (e) {
    return console.error(e.message);
  }
};

const buildAll = async () => {
  logger.log("o(*^▽^*)┛ bundle, please wait...\n");
  const promises = buildList.map((item) => build(item));
  try {
    await Promise.all(promises);
    logger.log("\n♪(^∇^*) done~☆!");
  } catch (e) {
    console.log(e.message);
  }
};

buildAll();
