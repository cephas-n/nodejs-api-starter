const express = require("express");
const chalk = require("chalk");
const router = require("./routes");
const authRouter = require("./routes/auth");
const auth = require("./middlewares/auth");
const throttle = require("./middlewares/throttle");
const cors = require("./middlewares/cors");
const headers = require("./middlewares/headers");
const loadEvironmentVariables = require("./utils/loadEnvironmentVariables");

loadEvironmentVariables();

const app = express();
const PORT = process.env.APP_PORT || 9001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(headers); // set headers
app.use(cors); // cors
// app.use(/^(?!\/api\/auth).*$/, auth); // authentication
app.use(throttle); // rate limit

app.use("/api", router);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(
    chalk.yellow(
      `App listening on port ${PORT} in ${process.env.APP_ENV?.toUpperCase()} mode`
    )
  );
});

// Uncaught exceptions
app.use((err, req, res, next) => {
  if (!res.headerSent) {
    res.status(500).send(err.message);
  }
});
