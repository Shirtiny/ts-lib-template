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
import util from "./util.js";

const __dirname = process.cwd();

const srcDirPath = path.resolve(__dirname, `./src`);
const distDirPath = path.resolve(__dirname, `./dist`);
const browserDistDirPath = path.resolve(__dirname, `./dist_browser`);

const buildList = [
  {
    name: "Esm",
    entries: `${srcDirPath}/main.ts`,
    targets: {
      main: {
        isLibrary: true,
        distDir: distDirPath,
      },
    },
  },
  {
    name: "Browser",
    entries: `${srcDirPath}/browser.ts`,
    targets: {
      browser: {
        isLibrary: true,
        distDir: distDirPath,
      },
    },
  },
  {
    name: "Types",
    entries: `${srcDirPath}/main.ts`,
    targets: {
      types: {
        isLibrary: true,
        distDir: `${distDirPath}/types`,
      },
    },
    isGenerateDeclaration: true,
  },
];

const build = async ({
  name,
  entries,
  targets,
  isGenerateDeclaration,
  ...options
}) => {
  try {
    let { bundleGraph, buildTime } = await new Parcel({
      name,
      entries,
      mode: "production",
      shouldDisableCache: true,
      env: config.env || process.env,
      targets,
    }).run();
    let bundles = bundleGraph.getBundles();
    if (bundles.length > 0) {
      if (isGenerateDeclaration) {
        console.log(`Generated declaration in ${buildTime}ms.`);
      } else {
        console.log(
          `Built target ${name} size ${
            bundles[0].stats.size / 1000
          }KB in ${buildTime}ms...`,
        );
      }
    }
  } catch (err) {
    console.log(err.diagnostics);
  }
};

const buildAll = async () => {
  logger.log("o(*^▽^*)┛ Building, please wait...");
  await util.pipePromises(...buildList.map((item) => () => build(item)))();
  logger.log("✨ Build completed ♪(^∇^*) ~☆!");
};

buildAll();
