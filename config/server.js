/*
 * @Author: Shirtiny
 * @Date: 2021-06-25 17:35:25
 * @LastEditTime: 2021-07-12 09:44:16
 * @Description:
 */
"use strict";

const esbuild = require("esbuild");
const http = require("http");
const path = require("path");
const open = require("open");
const { sassPlugin } = require("esbuild-sass-plugin");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const postcssPresetEnv = require("postcss-preset-env");
const util = require("./util");
const { config } = require("./var");
const logger = require("./logger");

const publicDirPath = path.resolve(__dirname, "../public");
const srcDirPath = path.resolve(__dirname, "../src");
const distDirPath = path.resolve(__dirname, "../dist");

const srcFileName = "index.ts";
const distFileName = "index.js";

// 需代理的路径列表
const proxyPathList = Object.keys(config.devServer?.proxy || {});

// 返回一个替换后的URL对象
const createDevProxyURL = (reqUrl = "") => {
  const proxy = config.devServer?.proxy;
  if (!proxy) return null;

  const proxyPath = proxyPathList.filter((p) => new RegExp(p).test(reqUrl))[0];
  if (proxyPath) {
    const { target, pathRewrite } = proxy[proxyPath];
    const rewriteKey = Object.keys(pathRewrite || {})[0];
    if (!rewriteKey) return new URL(`${target}${reqUrl}`);
    return new URL(
      `${target}${reqUrl.replace(
        new RegExp(rewriteKey),
        pathRewrite[rewriteKey],
      )}`,
    );
  }
  return null;
};

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
      define: {
        "process.env": JSON.stringify(process.env),
      },
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
  );

  const { host, port } = result;

  const proxyServerPort = config.devServer.port;

  http
    .createServer((req, res) => {
      const proxyURL = createDevProxyURL(req.url);

      const options = {
        hostname: proxyURL?.hostname || host,
        port: proxyURL?.port || port,
        path: proxyURL?.pathname || req.url,
        method: req.method,
        headers: req.headers,
      };

      const proxyReq = http.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        logger.chan(
          req.method.toUpperCase(),
          [
            req.url,
            proxyURL
              ? `${proxyURL.hostname}:${proxyURL.port}${proxyURL.pathname}`
              : "",
          ],
          res.statusCode,
        );
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
