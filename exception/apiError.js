const apiError = (err, res) => {
  console.error(err);
  res.status(500).send("Api Error");
};

module.exports = apiError;
