/*
 * @Author: Shirtiny
 * @Date: 2021-06-26 21:18:47
 * @LastEditTime: 2021-12-09 10:14:35
 * @Description:
 */

const chalk = require("chalk");
const tasuku = require("tasuku");

const log = (...messages) => {
  console.log(chalk.hex("#00b7c3")(...messages));
};

const chan = (title = "", inputs = [], output = "") => {
  const input = inputs
    .filter((i) => i)
    .map((i) => chalk.blueBright.underline(`${i}`))
    .join(` ${chalk.cyan("->")} `);
  console.log(
    `${chalk.greenBright.bold(title)} ${input} ${chalk.cyan(
      "->",
    )} ${chalk.yellowBright(output)}`,
  );
};

const server = (title = "", host = "", port = 80, protocol = "http:") => {
  console.log(
    `${chalk.magentaBright.bold(title)} ${chalk.italic(
      `listen in`,
    )} ${chalk.cyan(`${protocol}//${host}:${port}`)}`,
  );
};

const runTask = async ({
  title = "",
  successTitle = "",
  taskFn = async () => {},
}) => {
  const t = await tasuku(
    chalk.magentaBright.bold(title),
    async ({ setTitle }) => {
      const r = await taskFn();
      setTitle(chalk.yellowBright(successTitle));
      return r;
    },
  );
  return t.result;
};

module.exports = {
  chan,
  server,
  log,
  runTask,
};
