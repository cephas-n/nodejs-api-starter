const headers = (req, res, next) => {
  res.set("X-Frame-Options", "DENY");

  next();
};

module.exports = headers;
