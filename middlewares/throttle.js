const { default: rateLimit } = require("express-rate-limit");

const throttle = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-7",
});

module.exports = throttle;
