/*
 * @Author: Shirtiny
 * @Date: 2021-06-25 17:35:25
 * @LastEditTime: 2021-12-09 22:38:17
 * @Description:
 */
"use strict";

import http from "http";
import path from "path";
import open from "open";
import { fileURLToPath } from "url";
import { Parcel } from "@parcel/core";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";
import { config } from "./var.js";
import util from "./util.js";
import logger from "./logger.js";

const __dirname = process.cwd();

const publicDirPath = path.resolve(__dirname, "./public");
const srcDirPath = path.resolve(__dirname, "./src");
const distDirPath = path.resolve(__dirname, "./dist");

const srcFileName = "index.ts";
const distFileName = "index.js";

const parcel = new Parcel({
  entries: [`${srcDirPath}/index.html`],
  mode: "development",
  shouldDisableCache: true,
  env: config.env || process.env,
  defaultTargetOptions: {
    distDir: distDirPath,
    sourceMaps: true,
    publicUrl: "/",
    isLibrary: false,
  },
  serveOptions: {
    host: config.devServer.host,
    port: config.devServer.port,
    https: config.devServer.https || false,
  },
  hmrOptions: {
    host: config.devServer.host,
    port: config.devServer.port,
  },
  additionalReporters: [
    {
      packageName: "@parcel/reporter-cli",
      resolveFrom: fileURLToPath(import.meta.url),
    },
  ],
});

const serve = async () => {
  const subscription = await parcel.watch((err, event) => {
    if (err) {
      // fatal error
      throw err;
    }

    if (event.type === "buildSuccess") {
      let bundles = event.bundleGraph.getBundles();
      console.log(
        `✨ Built ${bundles.length} bundles in ${event.buildTime}ms!`,
      );
    } else if (event.type === "buildFailure") {
      console.log(event.diagnostics);
    }
  });

  // some time later...
  // await subscription.unsubscribe();
  util.cpAllDirChildsToDir(publicDirPath, distDirPath);
  logger.log(`✨ (≧∇≦)ﾉ Hi~！ server started.`);
  open(`http://${config.devServer.host}:${config.devServer.port}`);
};

serve();
