/*
 * @Author: Shirtiny
 * @Date: 2021-06-25 17:35:25
 * @LastEditTime: 2021-06-25 21:18:09
 * @Description:
 */
"use strict";

const esbuild = require("esbuild");
const http = require("http");
const path = require("path");
const open = require("open");
const chalk = require("chalk");

esbuild
  .serve(
    {
      servedir: path.resolve(__dirname, "../dist"),
      host: "localhost",
    },
    {
      entryPoints: [path.resolve(__dirname, "../src/main.ts")],
      outfile: path.resolve(__dirname, "../dist/main.dev.js"),
      platform: "browser",
      globalName: "bvplayer_core",
      bundle: true,
      sourcemap: "external",
    },
  )
  .then((result) => {
    const { host, port } = result;

    const proxyServerPort = 2021;

    http
      .createServer((req, res) => {
        const options = {
          hostname: host,
          port: port,
          path: req.url,
          method: req.method,
          headers: req.headers,
        };

        console.log(
          `${chalk.greenBright.bold(
            req.method.toUpperCase(),
          )} ${chalk.blueBright.underline.italic(`${req.url}`)} ${chalk.cyan(
            "->",
          )} ${chalk.yellowBright(res.statusCode)}`,
        );

        const proxyReq = http.request(options, (proxyRes) => {
          res.writeHead(proxyRes.statusCode, proxyRes.headers);
          proxyRes.pipe(res, { end: true });
        });

        req.pipe(proxyReq, { end: true });
      })
      .listen(proxyServerPort);

    open(`http://${host}:${proxyServerPort}`);

    console.log(
      `build server listen in ${host}:${port} ,proxy server listen in ${host}:${proxyServerPort}`,
    );
  });
