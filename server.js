const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// var corsOptions = {
//   origin: "http://localhost:3000",
// };
app.use(cors());

const corsOptions = {
  origin: ["http://localhost:<port_of_reactapp>"],
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});

require("./routers/index.js")(app);

const db = require("./app/model/index.model");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
