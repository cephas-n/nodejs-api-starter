const chalk = require("chalk");
const db = require("../config/db");
const Product = require("../models/Product");
const Store = require("../models/Store");

const seeder = async () => {
  // Products seeders
  console.log(chalk.yellow("Seeding..."));
  await Product().create({
    title: "T-shirt",
    price: 20,
    labels: ["fashion", "clothes", "t-shirts"],
    description: "awesome t-shirt",
    images: ["images/test.jpg"],
    storeId: 1,
  });

  await Store().bulkCreate([
    {
      name: "Fernando",
      country: "Turkey",
    },
    {
      name: "MC Electronics",
      country: "Canada",
    },
  ]);
  console.log(chalk.yellow("Success"));
};

module.exports = seeder;
