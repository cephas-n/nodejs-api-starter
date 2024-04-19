const { TokenExpiredError } = require("jsonwebtoken");
const { ValidationErrorItem } = require("sequelize");
const { ValidationError } = require("yup");
const { ZodError } = require("zod");

const apiError = (err, res) => {
  if (res.headerSent) return;

  console.error(err);

  switch (true) {
    case err instanceof TokenExpiredError:
      res.status(403).send({ err });
      break;
    case err instanceof ValidationError ||
      err?.errors?.[0] instanceof ValidationErrorItem ||
      err instanceof ZodError:
      res.status(422).send({ errors: err.errors });
      break;
    default:
      res.status(500).send("Api Error");
  }
};

module.exports = apiError;
