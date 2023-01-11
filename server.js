
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors")
const hljs = require('highlight.js');
const quotes = require("./src/routes/quotes.js");
const posts = require("./src/routes/posts");
const users = require("./src/routes/users");
const pages = require("./src/routes/pages");

//Database connection
mongoose.connect(process.env.MONGODB_URI);

app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cors({
  origin: "*",
  methods: ["GET"]
}));

app.use("/", pages);
app.use("/quotes", quotes);
app.use("/posts", posts);
app.use("/users", users)
app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
})

app.listen(8000, process.env.IP_ADDRESS || "localhost", (req, res) => {
  console.log("Magic is currently happening on port 8000.")
});
