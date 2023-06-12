const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Admin", adminSchema);