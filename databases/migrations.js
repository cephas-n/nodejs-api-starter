const chalk = require("chalk");
const Product = require("../models/Product");
const db = require("../config/db");
const sequelize = require("sequelize");
const minimist = require("minimist");
const seeder = require("./seeder");
const Store = require("../models/Store");
const User = require("../models/User");
const loadEvironmentVariables = require("../utils/loadEnvironmentVariables");

loadEvironmentVariables();

const args = minimist(process.argv.slice(2), {
  boolean: true,
});

(async () => {
  try {
    await Product().sync({ force: args._.includes("fresh") });
    await Store().sync({ force: args._.includes("fresh") });
    await User().sync({ force: args._.includes("fresh") });

    if (args.seed) {
      await seeder();
    }

    console.log(chalk.green("Migrations completed successfully"));
  } catch (err) {
    console.error(chalk.red(`Migration failed: `), err);
  }
})();
