/*
 * @Author: Shirtiny
 * @Date: 2021-06-26 20:47:19
 * @LastEditTime: 2021-08-06 21:54:29
 * @Description:
 */
module.exports = {
  globalName: "tsLibTemplate",
  devServer: {
    host: "localhost",
    port: 2021,
    proxy: {
      "^/api": {
        target: "http://192.168.6.111:9780",
        pathRewrite: { "^/api": "" },
      },
    },
  },
  jsxFactory: "React.createElement",
  jsxFragment: "React.Fragment",
};
