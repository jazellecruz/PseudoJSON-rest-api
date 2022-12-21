
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const quotes = require("./routes/quotes.js");
const posts = require("./routes/posts")

//Database connection
mongoose.connect("mongodb://localhost:27017/quotesDB");

app.use(express.json())

app.use("/quotes", quotes);
app.use("/posts", posts);

app.listen("8000", (req, res) => {
  console.log("Magic is currently happening on port 8000.")
});