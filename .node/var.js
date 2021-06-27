/*
 * @Author: Shirtiny
 * @Date: 2021-06-26 20:17:19
 * @LastEditTime: 2021-06-26 21:02:31
 * @Description:
 */

const config = require("../.sh");

module.exports = {
  config,
  isDev: process.env.NODE_ENV === "development",
};
