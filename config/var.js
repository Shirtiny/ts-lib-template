/*
 * @Author: Shirtiny
 * @Date: 2021-06-26 20:17:19
 * @LastEditTime: 2021-12-09 21:02:01
 * @Description:
 */

import config from "../.sh.js";

console.log("ENV: ", config.env);

const isDev = process.env.NODE_ENV === "development";

export { config, isDev };
