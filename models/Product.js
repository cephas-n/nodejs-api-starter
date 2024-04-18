const sequelize = require("sequelize");
const db = require("../config/db");
const chalk = require("chalk");

const Product = async () => {
  try {
    const connection = await db.createConnection();

    return connection.define("Product", {
      title: {
        type: sequelize.DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: sequelize.DataTypes.DOUBLE,
        allowNull: false,
      },
      labels: {
        type: sequelize.DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: sequelize.DataTypes.STRING,
        allowNull: false,
      },
      images: {
        type: sequelize.DataTypes.STRING,
        allowNull: false,
      },
    });
  } catch (err) {
    console.log(chalk.error(`Product ORM Model Error: ${err.message}`));
    throw err;
  }
};

module.exports = Product;
