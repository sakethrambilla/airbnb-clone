const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User.js");
require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());

app.use(
  cors({
    credentials: true,
    "Access-Control-Allow-Origin": "http://127.0.0.1:5173/",
  })
);
// console.log(process.env.MONGO_URL);
mongoose.connect("process.env.MONGO_URL");
console.log("MongoDB Connected");

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register1", async (req, res) => {
  const { name, email, password } = req.body;
  User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  });
  res.json({ name, email, password });
});

app.listen(4000);
