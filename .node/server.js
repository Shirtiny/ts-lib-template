/*
 * @Author: Shirtiny
 * @Date: 2021-06-25 17:35:25
 * @LastEditTime: 2021-06-26 22:25:18
 * @Description:
 */
"use strict";

const esbuild = require("esbuild");
const http = require("http");
const path = require("path");
const open = require("open");
const { sassPlugin } = require("esbuild-sass-plugin");
const util = require("./util");
const { config } = require("./var");
const logger = require("./logger");

const publicDirPath = path.resolve(__dirname, "../public");
const srcDirPath = path.resolve(__dirname, "../src");
const distDirPath = path.resolve(__dirname, "../dist");

const srcFileName = "index.ts";
const distFileName = "index.js";

const serve = async () => {
  await util.mkdir(distDirPath);
  util.cpAllDirChildsToDir(publicDirPath, distDirPath);

  const result = await esbuild.serve(
    {
      servedir: path.resolve(__dirname, "../dist"),
      host: config.devServer.host,
    },
    {
      entryPoints: [`${srcDirPath}/${srcFileName}`],
      outfile: `${distDirPath}/${distFileName}`,
      platform: "browser",
      globalName: config.globalName,
      bundle: true,
      sourcemap: "both",
      plugins: [sassPlugin()],
    },
  );

  const { host, port } = result;

  const proxyServerPort = config.devServer.port;

  http
    .createServer((req, res) => {
      const options = {
        hostname: host,
        port: port,
        path: req.url,
        method: req.method,
        headers: req.headers,
      };

      const proxyReq = http.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        logger.chan(req.method.toUpperCase(), req.url, res.statusCode);
        proxyRes.pipe(res, { end: true });
      });

      req.pipe(proxyReq, { end: true });
    })
    .listen(proxyServerPort);

  open(`http://${host}:${proxyServerPort}`);

  logger.log("(≧∇≦)ﾉ Hi~！");
  logger.server("Build Server", host, port, "http:");
  logger.server("Proxy Server", host, proxyServerPort, "http:");
};

serve();
