/*
 * @Author: Shirtiny
 * @Date: 2021-06-26 17:41:22
 * @LastEditTime: 2021-12-09 15:47:31
 * @Description:
 */
import esbuild from "esbuild";
import childProcess from "child_process";
import path from "path";
import { sassPlugin } from "esbuild-sass-plugin";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";
import timePlugin from "esbuild-plugin-time";
import { config, isDev } from "./var.js";
import logger from "./logger.js";

const __dirname = process.cwd();

const srcDirPath = "./src";
const distDirPath = "./dist";
const typesDirPath = path.resolve(__dirname, `${distDirPath}/types`);
const fileName = config.outputFileName || "main";

const tscCommand = `tsc --declaration --declarationDir ${typesDirPath} --emitDeclarationOnly`;

const createFilePath = (dirPath, fileName) => {
  return path.resolve(__dirname, `${dirPath}/${fileName}`);
};

const buildList = [
  {
    name: "Bundle Browser",
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
    name: "Bundle Esm",
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
    name: "Bundle Node",
    entryPoints: [createFilePath(srcDirPath, "cli.ts")],
    platform: "node",
    outfile: createFilePath(distDirPath, fileName + ".cli.js"),
    plugins: [],
  },
];

const build = async ({
  name,
  entryPoints = [],
  platform,
  outfile,
  plugins = [],
}) => {
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
        plugins: [...plugins, timePlugin(name)],
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
