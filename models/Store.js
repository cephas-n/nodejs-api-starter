const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Store = () => {
  try {
    const connection = db.createConnection();

    return connection.define("Store", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Turkey",
      },
    });
  } catch (err) {
    console.log(chalk.error(`Store ORM Model Error: ${err.message}`));
    throw err;
  }
};

module.exports = Store;
