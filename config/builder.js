/*
 * @Author: Shirtiny
 * @Date: 2021-06-26 17:41:22
 * @LastEditTime: 2021-12-09 21:01:43
 * @Description:
 */
import path from "path";
import { fileURLToPath } from "url";
import { Parcel } from "@parcel/core";
import { config, isDev } from "./var.js";
import logger from "./logger.js";

const __dirname = process.cwd();

const srcDirPath = path.resolve(__dirname, `./src`);
const distDirPath = path.resolve(__dirname, `./dist`);
const browserDistDirPath = path.resolve(__dirname, `./dist_browser`);
// const fileName = config.outputFileName || "main";

// const tscCommand = `tsc --declaration --declarationDir ${typesDirPath} --emitDeclarationOnly`;

const createFilePath = (dirPath, fileName) => {
  return `${dirPath}/${fileName}`;
};

const buildList = [
  {
    name: "Bundle Esm",
    entries: [createFilePath(srcDirPath, "es.ts")],
    mode: "production",
    shouldDisableCache: true,
    env: config.env || process.env,
    defaultTargetOptions: {
      distDir: distDirPath,
      sourceMaps: false,
      isLibrary: true,
      optimize: true,
    },
    additionalReporters: [
      {
        packageName: "@parcel/reporter-cli",
        resolveFrom: fileURLToPath(import.meta.url),
      },
    ],
  },
  {
    name: "Bundle Browser",
    entries: [createFilePath(srcDirPath, "browser.ts")],
    mode: "production",
    shouldDisableCache: true,
    env: config.env || process.env,
    targets: {
      main: {
        distDir: browserDistDirPath,
        sourceMap: false,
        isLibrary: false,
        optimize: true,
        outputFormat: "global",
      },
    },
    additionalReporters: [
      {
        packageName: "@parcel/reporter-cli",
        resolveFrom: fileURLToPath(import.meta.url),
      },
    ],
  },
];

const build = async ({ name, ...options }) => {
  console.log(name);
  await logger.runTask({
    title: `Building`,
    successTitle: `Build ${name} successfully`,
    taskFn: async () => {
      try {
        let { bundleGraph, buildTime } = await new Parcel(options).run();
        let bundles = bundleGraph.getBundles();
        // console.log(`✨ Built ${bundles.length} bundles in ${buildTime}ms!`);
      } catch (err) {
        console.log(err.diagnostics);
      }
    },
  });
};

const buildAll = async () => {
  logger.log("\n♪(^∇^*) ~☆!, Generated declaration.");
  logger.log("o(*^▽^*)┛ Building, please wait...");
  const promises = buildList.map((item) => build(item));
  await Promise.all(promises);
};

buildAll();
