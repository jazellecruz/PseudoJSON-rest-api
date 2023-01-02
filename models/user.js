const mongoose= require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  birthDate: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("User", userSchema);