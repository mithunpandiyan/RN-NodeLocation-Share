var jwt = require("jsonwebtoken");
const config = require("./jwtaccessdatabase");

verifyToken = (req, res, next) => {
  let token = req.headers["token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};
module.exports = verifyToken;
