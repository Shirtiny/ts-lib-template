/*
 * @Author: Shirtiny
 * @Date: 2021-06-26 17:41:22
 * @LastEditTime: 2021-11-27 10:42:54
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
const typesDirPath = path.resolve(__dirname, `${distDirPath}/types`);
const fileName = config.outputFileName || "main";

const tscCommand = `tsc --declaration --declarationDir ${typesDirPath} --emitDeclarationOnly`;

const createFilePath = (dirPath, fileName) => {
  return path.resolve(__dirname, `${dirPath}/${fileName}`);
};

const buildList = [
  {
    entryPoints: [createFilePath(srcDirPath, "browser.ts")],
    platform: "browser",
    outfile: createFilePath(distDirPath, fileName + ".browser.js"),
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
    outfile: createFilePath(distDirPath, fileName + ".es.js"),
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
    outfile: createFilePath(distDirPath, fileName + ".cli.js"),
    plugins: [],
  },
];

const build = async ({ entryPoints = [], platform, outfile, plugins = [] }) => {
  await logger.runTask({
    title: `Building ${entryPoints.join("; ")}`,
    successTitle: `Build ${outfile} successfully`,
    taskFn: async () => {
      await esbuild.build({
        entryPoints,
        platform,
        globalName: config.globalName,
        bundle: true,
        minify: !isDev,
        sourcemap: isDev ? "both" : false,
        define: {
          "process.env": JSON.stringify(config.env || process.env),
        },
        outfile,
        plugins,
        jsxFactory: config.jsxFactory,
        jsxFragment: config.jsxFragment,
      });
    },
  });
};

const buildAll = async () => {
  childProcess.execSync(tscCommand);
  logger.log("\n♪(^∇^*) ~☆!, Generated declaration.");
  logger.log("o(*^▽^*)┛ Building, please wait...");
  const promises = buildList.map((item) => build(item));
  await Promise.all(promises);
};

buildAll();
