const User = require("../models/user")
const ErrorMessage = require("../classes/error");
const { stringify, checkIfProcessed } = require("../helpers/helpers");

// functions for modyfing the actual database

// add new user
const addUserOnDb = async(entry) => {
  let response;
  let { 
    id,
    firstName,
    lastName,
    middleName,
    gender,
    birthDate,
    email,
    phone,
    imgUrl
  } = entry

  let newUser = new User({
    id: id,
    firstName: firstName,
    lastName: lastName,
    middleName: middleName,
    gender: gender,
    birthDate: birthDate,
    email: email,
    phone: phone,
    imgUrl: imgUrl
  })

  await newUser.save()
  .then(res => response = res)
  .catch(err => new ErrorMessage("An error occured while performing request.", error = stringify(err.message)))

  return response
}

// modify a single user
const modifyUserFromDb = async(id, entry) => {
  let response

  try {
    let result = await User.updateOne({ id : id }, { $set : entry })
    response = checkIfProcessed(result.acknowledged, result.modifiedCount, "PATCH")
  } catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }

  return response
}

// replace a whole document
const replaceUserFromDb = async(id, entry) => {
  let response
  let userId = id
  let { 
    newId,
    firstName,
    middleName,
    lastName,
    gender,
    birthDate,
    email,
    phone
  } = entry

  try {
    let result = await User.replaceOne({ id: userId }, {
      id: newId,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      gender: gender,
      birthDate: birthDate,
      email: email,
      phone: phone
    });
    response = checkIfProcessed(result.acknowledged, result.modifiedCount, "PUT");

  } catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }

  return response
}

//delete a single user
const deleteUserFromDb = async(id) => {
  let response 

  try {
    let result = await User.deleteOne({ id : id })
    response = checkIfProcessed(result.acknowledged, result.deletedCount, "DELETE")
  } catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }
  return response
}

module.exports = { addUserOnDb, modifyUserFromDb, replaceUserFromDb, deleteUserFromDb }