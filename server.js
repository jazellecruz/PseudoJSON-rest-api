
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors")
const hljs = require('highlight.js');
const quotes = require("./src/routes/quotes");
const posts = require("./src/routes/posts");
const users = require("./src/routes/users");
const pages = require("./src/routes/pages");

// routes to modify db
const quotesDb = require("./src/routes/quotes-db");
const postsDb = require("./src/routes/posts-db");
const usersDb = require("./src/routes/users-db");


//Database connection
mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/", pages);
app.use("/quotes", quotes);
app.use("/posts", posts);
app.use("/users", users)

// db routes
app.use("/db/quotes", quotesDb);
app.use("/db/posts", postsDb);
app.use("/db/users", usersDb)

// nonexisting routes
app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
})

app.listen(8000, process.env.IP_ADDRESS || "localhost", (req, res) => {
  console.log("Magic is currently happening on port 8000.")
});
