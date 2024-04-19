require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const router = require("./routes");
const authRouter = require("./routes/auth");
const auth = require("./middlewares/auth");
const throttle = require("./middlewares/throttle");
const cors = require("./middlewares/cors");
const apiError = require("./exceptions/apiError");
const headers = require("./middlewares/headers");

const app = express();
const port = 9001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(headers); // set headers
app.use(cors); // cors
app.use(/^(?!\/api\/auth).*$/, auth); // authentication
app.use(throttle); // rate limit

app.use("/api", router);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(chalk.green(`App listening on port ${port}`));
});

// Uncaught exceptions
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});
