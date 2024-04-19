const httpCors = require("cors");

const whitelist = ["*"];

const cors = httpCors({
  origin: (origin, callback) => {
    console.log(origin);
    if (whitelist.includes("*") || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed"));
    }
  },
});

module.exports = cors;
