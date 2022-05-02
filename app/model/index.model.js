const dbConfig = require("../config/db");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.auth = require("./auth.model.js")(mongoose);
db.location = require("./location.model.js")(mongoose);

module.exports = db;
