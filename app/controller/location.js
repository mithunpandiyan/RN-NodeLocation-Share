const db = require("../model/index.model");
const Location = db.location;

exports.locations = async (req, res) => {
  const location = new Location({
    from: req.body.from,
    to: req.body.to,
    lattitude: req.body.lattitude,
    logititude: req.body.logititude,
  });
  location
    .save(location)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating.",
      });
    });
};

exports.getlocations = async (req, res) => {
  const id = req.params.id;
  Location.find({ from: id })
    .populate("to")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
