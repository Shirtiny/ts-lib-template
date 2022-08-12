/*
 * @Author: Shirtiny
 * @Date: 2021-06-26 18:51:15
 * @LastEditTime: 2021-06-26 19:14:26
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

const mkdir = async (dirPath, force = false) => {
  let isExisted = await isPathExisted(dirPath);
  if (isExisted && force) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    isExisted = false;
  }
  !isExisted && fs.mkdirSync(dirPath);
};

const writeFile = (path, content) => {
  fs.writeFileSync(path, content);
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
  writeFile,
};

export default util;
