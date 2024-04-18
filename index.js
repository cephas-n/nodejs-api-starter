const express = require("express");
const sequelize = require("sequelize");
const chalk = require("chalk");
const db = require("./config/db");
const Product = require("./models/Product");
const dotenv = require("dotenv").config();

const app = express();
const port = 9001;
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  try {
    const connection = await db.createConnection();
    req.db = connection;
    return next();
  } catch (err) {
    console.err(err);
  }
});

router.get("/products", async (req, res) => {
  const products = await (await Product()).findAll();
  res.json({ products });
});

app.use("/api", router);
app.listen(port, () => {
  console.log(chalk.green(`App listening on port ${port}`));
});
