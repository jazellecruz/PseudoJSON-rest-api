
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const quotes = require("./routes/quotes.js");
const posts = require("./routes/posts")
const users = require("./routes/users")

//Database connection
mongoose.connect(process.env.MONGODB_URI);

app.use(express.json())

app.use("/quotes", quotes);
app.use("/posts", posts);
app.use("/users", users)

app.listen("8000", (req, res) => {
  console.log("Magic is currently happening on port 8000.")
});
