const chalk = require("chalk");
const { Sequelize } = require("sequelize");

const createConnection = () => {
  try {
    const db = new Sequelize(
      process.env.DB_DATABASE,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_CONNECTION,
        port: process.env.DB_PORT,
      }
    );

    console.log(chalk("Database connection established"));

    return db;
  } catch (err) {
    console.error(chalk.red(`Unable to connect to database: ${err.message}`));
    throw err;
  }
};

module.exports = { createConnection };
