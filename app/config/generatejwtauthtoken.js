var jwt = require("jsonwebtoken");
global.config = require("./jwtaccessdatabase");

const generateAuthToken = (login) => {
  console.log("token generated");

  const token = jwt.sign(
    {
      id: login.id,
      email: login.email,
    },

    global.config.secretKey,
    {
      algorithm: "HS256",
      // expiresIn: '30days'
      expiresIn: "30d",
    }
  );
  return token;
};

module.exports.generateAuthToken = generateAuthToken;
