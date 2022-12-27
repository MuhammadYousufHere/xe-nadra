const jsonwebtoken = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
module.exports = function (req, res, next) {
  // get token from header
  const token = req.header("x-auth-token");

  // check if no token

  if (!token) {
    return res.status(401).json({ msg: "No token, Authorization is denied!" });
  }
  // verify token
  try {
    const decoded = jsonwebtoken.verify(token, secret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid!" });
  }
};
