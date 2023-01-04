const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Post", postsSchema);