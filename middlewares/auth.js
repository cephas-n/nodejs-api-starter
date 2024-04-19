const jwt = require("jsonwebtoken");
const apiError = require("../exceptions/apiError");

const auth = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    if (!authorizationHeader) {
      res.sendStatus(403);
    }
    const [scheme = "", token = ""] = authorizationHeader.split(" ");
    console.log(token);

    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log(user);

    if (!user) {
      res.sendStatus(401);
    }
    return next();
  } catch (err) {
    apiError(err, res);
  }
};

module.exports = auth;
