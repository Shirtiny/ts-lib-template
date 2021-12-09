/*
 * @Author: Shirtiny
 * @Date: 2021-06-26 18:51:15
 * @LastEditTime: 2021-12-09 21:01:57
 * @Description:
 */

import fs from "fs";
import shell from "shelljs";

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

const util = {
  isPathExisted,
  mkdir,
  rm,
  cpAllDirChildsToDir,
};

export default util;
