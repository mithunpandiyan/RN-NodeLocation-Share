const auth = require("../app/controller/auth.controller.js");
const user = require("../app/controller/users.controller.js");
const location = require("../app/controller/location.js");

const tokenVerify = require("../app/config/verifytoken.js");

module.exports = (app) => {
  var router = require("express").Router();

  router.post("/register", auth.register);
  router.put("/login", auth.login);

  router.get("/users", tokenVerify, user.users);
  router.post("/location", tokenVerify, location.locations);
  router.get("/locations/:id", tokenVerify, location.getlocations);

  app.use("/api/v1", router);
};
