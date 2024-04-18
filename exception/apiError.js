const { ValidationErrorItem } = require("sequelize");
const { ValidationError } = require("yup");

const apiError = (err, res) => {
  if (res.headerSent) return;
  console.error(err);
  switch (true) {
    case err instanceof ValidationError ||
      err?.errors[0] instanceof ValidationErrorItem:
      const { errors } = err;
      res.status(422).send({ errors });
      break;
    default:
      res.status(500).send("Api Error");
  }
};

module.exports = apiError;
