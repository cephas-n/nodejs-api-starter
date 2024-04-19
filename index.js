require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const router = require("./routes");
const authRouter = require("./routes/auth");
const auth = require("./middlewares/auth");

const app = express();
const port = 9001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(/^(?!\/api\/auth).*$/, auth);

app.use("/api", router);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(chalk.green(`App listening on port ${port}`));
});
