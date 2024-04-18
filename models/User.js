const { DataTypes } = require("sequelize");
const db = require("../config/db");

const User = () => {
  const connection = db.createConnection();

  return connection.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = User;
