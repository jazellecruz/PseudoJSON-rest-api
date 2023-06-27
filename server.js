
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
const errorHandler = require("./src/middlewares/error");
const connectToDB = require("./src/db/mongoose");

// routes to modify db
const quotesDb = require("./src/routes/quotes-db");
const postsDb = require("./src/routes/posts-db");
const usersDb = require("./src/routes/users-db");

// auth routes
const admin = require("./src/routes/admin");

//Database connection
// mongoose.connect(process.env.MONGODB_DEV, {useNewUrlParser: true});
connectToDB();

app.use(cors());
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

// authentication routes
app.use("/", admin)

app.use("/", pages);
app.use("/quotes", quotes);
app.use("/posts", posts);
app.use("/users", users)

// routes for modifying the actual database
app.use("/private/quotes", quotesDb);
app.use("/private/posts", postsDb);
app.use("/private/users", usersDb)

// nonexisting routes
app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

// custom error handler. All errors will be handled here.
app.use(errorHandler);

app.listen(8000, '0.0.0.0', (req, res) => {
  let env = process.env.NODE_ENV
  console.log(`Currently running on ${env} enviroment.`)
  console.log("Huzzah! Successfully running on port 8000.")
});
