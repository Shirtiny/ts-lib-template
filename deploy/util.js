/*
 * @Author: Shirtiny
 * @Date: 2021-06-26 18:51:15
 * @LastEditTime: 2021-06-26 19:14:26
 * @Description:
 */

import fs from "fs";
import shell from "shelljs";
import path from "path";

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
  // shell.rm("-rf", path);
  fs.rmSync(path, { recursive: true, force: true });
};

const cpAllDirChildrenToDir = async (dirPath, targetDirPath) => {
  await mkdir(targetDirPath);
  shell.cp("-rf", `${dirPath}/*`, `${targetDirPath}/`);
};

const renameFile = (filePath, newName) => {
  shell.mv(filePath, path.resolve(path.dirname(filePath), newName));
};

const pipePromises = (...fns) => {
  return async (input) =>
    fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(input));
};

const util = {
  isPathExisted,
  mkdir,
  rm,
  cpAllDirChildrenToDir,
  writeFile,
  renameFile,
  pipePromises,
};

export default util;
