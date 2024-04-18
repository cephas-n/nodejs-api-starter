const { DataTypes } = require("sequelize");
const db = require("../config/db");
const chalk = require("chalk");

const Product = () => {
  try {
    const connection = db.createConnection();

    return connection.define("Product", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      labels: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      images: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      storeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  } catch (err) {
    console.error(chalk.red(`Product ORM Model Error: ${err.message}`));
    throw err;
  }
};

module.exports = Product;
