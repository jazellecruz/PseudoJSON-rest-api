const User = require("../models/user")
const ApiResponse = require("../classes/apiResponse")
const ErrorMessage = require("../classes/error");
const { stringify, checkIfProcessed } = require("../helpers/helpers");
const { options } = require("../constants/constants");

//get all users
const getUsers = async(query) => {
  let response;
  let limit = query.pageSize
  let page = query.page - 1

  try {
    let result = await User.find(query, options)
        .limit(limit)
        .skip(limit * page)
        .sort({ id : 1 })
    
    let totalCountDocs = await User.countDocuments(query)

    if (!result.length) {
      response = new ErrorMessage(
        `Resource with conditions: ${stringify(query)} does not exist.`,
        error = "Resources Not Found.",
        code = 404)
    } else {
      response = new ApiResponse(result, 
                  "users", 
                  totalCountDocs, 
                  page = query.page, 
                  limit = limit)
    }

  } catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }

  return response
}

// get user by id
const getUserById = async(id) => {
  let response;

  try {
    let result = await User.find({ id : id }, options);

    if (!result.length) {
      response = new ErrorMessage(
        `User with id: ${id} does not exist.`,
        error = "Resources Not Found.",
        code = 404
        )
    } else {
      response = result
    }

  } catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }

  return response
}

//add a new user 
const addUser = async(entry) => {
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

// update or modify a user 
const modifyUser = async(id, entry) => {
  let response

  try {
    let result = await User.updateOne({ id : id }, { $set : entry })
    response = checkIfProcessed(result.acknowledged, result.modifiedCount, "update/modify")
  } catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }

  return response
}

// replace a user
// NOTE: I DO NOT ADVISE TO REPLACE A WHOLE DOCUMENT
// I SUGGEST TO CREATE A NEW ONE INSTEAD TO AVOID DUPLICATION OF ID 
const replaceUser = async(id, user) => {
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
  } = user

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
    response = checkIfProcessed(result.acknowledged, result.modifiedCount, "replace");

  } catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }

  return response
}

//delete a user
const deleteUser = async(id) => {
  let response 

  try {
    let result = await User.deleteOne({ id : id })
    response = checkIfProcessed(result.acknowledged, result.deletedCount, "delete")
  } catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }
  return response
}


module.exports = { getUsers, getUserById, addUser, modifyUser, replaceUser, deleteUser }