/*
 * @Author: Shirtiny
 * @Date: 2021-06-26 20:47:19
 * @LastEditTime: 2021-12-09 21:00:58
 * @Description:
 */

import camelCase from "camelcase";

const { MY_ENV, HOST, PORT, NODE_ENV, npm_package_version, npm_package_name } =
  process.env;

const env = {
  MY_ENV,
  HOST,
  PORT,
  NODE_ENV,
  npm_package_name,
  npm_package_version,
};

const globalName =
  camelCase(
    String(npm_package_name)
      .replace(/[\/-]/gi, "_")
      .replace(/[^a-z_]/gi, ""),
  ) || "globalName";

console.log("APP globalName : ", globalName);

export default {
  globalName,
  devServer: {
    host: HOST || "localhost",
    port: PORT || 2021,
  },
  env,
};
