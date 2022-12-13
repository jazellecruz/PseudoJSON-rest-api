
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const quotesRoute = require("./routes/quotesRoutes.js");

//Database connection
mongoose.connect("mongodb://localhost:27017/quotesDB");

app.use(express.json())
app.use("/", quotesRoute)

app.listen("8000", (req, res) => {
  console.log("Magic is currently happening on port 8000.")
});