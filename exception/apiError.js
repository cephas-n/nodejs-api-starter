const apiError = (err, res) => {
  if (!res.headerSent) return;
  res.status(500).send("Api Error");
};

module.exports = apiError;
