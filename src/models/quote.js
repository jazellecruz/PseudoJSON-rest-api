const mongoose = require("mongoose");

const quotesSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true
  },
  quote: {
    type: String,
    required: true
  },
  category: [{
    type: String
  }]
});

module.exports = mongoose.model("Quote", quotesSchema);