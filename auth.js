require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    res.json({ message: "No token found, please signin first" });
    return;
  }
  jwt.verify(token, JWT_SECRET, (err, decodedInfo) => {
    if (err) {
      res.status(401).json("Incorrect credentials, Not authorized");
    } else if (decodedInfo) {
      console.log(decodedInfo);
      req.userId = decodedInfo.userId;
      next();
    } else {
      return;
    }
  });
}

module.exports = authMiddleware;
