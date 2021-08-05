/*
 * @Author: Shirtiny
 * @Date: 2021-06-26 18:51:15
 * @LastEditTime: 2021-06-26 19:14:26
 * @Description:
 */

const fs = require("fs");
const shell = require("shelljs");

const isPathExisted = async (path) => {
  return new Promise((resolve) => {
    fs.access(path, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

const mkdir = async (dirPath) => {
  const isExisted = await isPathExisted(dirPath);
  if (!isExisted) {
    fs.mkdirSync(dirPath);
  }
};

const rm = (path) => {
  shell.rm("-rf", path);
};

const cpAllDirChildsToDir = (dirPath, targetDirPath) => {
  shell.cp("-rf", `${dirPath}/*`, `${targetDirPath}/`);
};

module.exports = {
  isPathExisted,
  mkdir,
  rm,
  cpAllDirChildsToDir
};
