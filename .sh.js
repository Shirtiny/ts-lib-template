/*
 * @Author: Shirtiny
 * @Date: 2021-06-26 20:47:19
 * @LastEditTime: 2021-06-29 15:44:23
 * @Description:
 */
module.exports = {
  globalName: "tsLibTemplate",
  devServer: {
    host: "localhost",
    port: 2021,
    proxy: {
      '^/api': {
        target: 'http://192.168.6.111:9780',
        pathRewrite: { '^/api': '' },
      },
    }
  },
};
