const db = require("../model/index.model");
const Auth = db.auth;

exports.users = async (req, res) => {
  await Auth.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.",
      });
    });
};
