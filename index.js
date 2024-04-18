require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const db = require("./config/db");
const router = require("./routes");

const app = express();
const port = 9001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  try {
    const connection = db.createConnection();
    req.db = connection;
    return next();
  } catch (err) {
    console.err(err);
  }
});

app.use("/api", router);

app.listen(port, () => {
  console.log(chalk.green(`App listening on port ${port}`));
});
