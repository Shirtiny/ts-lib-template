/*
 * @Author: Shirtiny
 * @Date: 2021-06-26 21:18:47
 * @LastEditTime: 2021-06-26 21:56:29
 * @Description:
 */

const chalk = require("chalk");

const log = (...messages) => {
  console.log(chalk.hex("#00b7c3")(...messages));
};

const chan = (title = "", input = "", output = "") => {
  console.log(
    `${chalk.greenBright.bold(title)} ${chalk.blueBright.underline.italic(
      `${input}`,
    )} ${chalk.cyan("->")} ${chalk.yellowBright(output)}`,
  );
};

const server = (title = "", host = "", port = 80, protocol = "http:") => {
  console.log(
    `${chalk.magentaBright.bold(title)} ${chalk.italic(
      `listen in`,
    )} ${chalk.cyan(`${protocol}//${host}:${port}`)}`,
  );
};

module.exports = {
  chan,
  server,
  log
};
