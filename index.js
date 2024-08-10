require("dotenv").config();
require("./src/db").connect();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./src/routes");
const path = require("path");

const app = express();

const corsOptions = {
  origin: "https://passage-frontend.onrender.com",
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "OPTIONS"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server is running on port ${PORT}`);
});
