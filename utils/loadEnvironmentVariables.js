const dotenv = require("dotenv");
const minimist = require("minimist");
const path = require("path");

const loadEvironmentVariables = () => {
  const rootPath = path.basename("/");
  const envFiles = [path.join(rootPath, ".env")];

  const NODE_ENV = process.env.NODE_ENV || minimist(process.argv?.slice(2)).env;

  if (NODE_ENV === "test" || NODE_ENV === "testing") {
    envFiles.unshift(path.join(rootPath, ".env.test"));
  } else if (NODE_ENV === "local" || NODE_ENV === "development") {
    envFiles.unshift(path.join(rootPath, ".env.development"));
    envFiles.unshift(path.join(rootPath, ".env.local"));
  } else if (NODE_ENV === "production") {
    envFiles.unshift(path.join(rootPath, ".env.production"));
  }

  dotenv.config({
    path: envFiles,
  });
};

module.exports = loadEvironmentVariables;
