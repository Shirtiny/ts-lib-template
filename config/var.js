/*
 * @Author: Shirtiny
 * @Date: 2021-06-26 20:17:19
 * @LastEditTime: 2021-06-29 11:34:12
 * @Description:
 */

const config = require("../.sh");

console.log("MY_ENV: ", process.env.MY_ENV);
console.log("NODE_ENV: ", process.env.NODE_ENV);

module.exports = {
  config,
  isDev: process.env.NODE_ENV === "development",
};
