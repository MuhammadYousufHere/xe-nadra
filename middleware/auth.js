const jsonwebtoken = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // get token from header
  const token = req.header("x-auth-token");

  // xhexk if no token

  if (!token) {
    return res.status(401).json({ msg: "No token, Authorization is denied!" });
  }
  // verify token
  try {
    const decoded = jsonwebtoken.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid!" });
  }
};
