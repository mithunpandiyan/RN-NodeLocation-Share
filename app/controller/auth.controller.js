const db = require("../model/index.model");
const Auth = db.auth;
var bcrypt = require("bcryptjs");
const generatejwtauthtoken = require("../config/generatejwtauthtoken");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  let user = await Auth.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("The user already exisits!");
  }
  const auth = new Auth({
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hashSync(req.body.password, 10),
  });
  auth
    .save(auth)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating.",
      });
    });
};

exports.login = async (req, res) => {
  console.log(req.body);
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  let user = await Auth.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send("user does not exisits!");
  }
  const match = bcrypt.compareSync(req.body.password, user.password);
  if (!match) {
    return res.status(400).send("Incorrect password");
  }
  console.log(match);
  const token = await generatejwtauthtoken.generateAuthToken(user);
  res.send({ user: user, token: token });
};
