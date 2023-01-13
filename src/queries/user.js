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
  // make a new object with the body sent by the user then return 
  // it as a normal response 
}

// update or modify a user 
const modifyUser = async(id, entry) => {
  // find the resource by its id then make a new object
  // modifying it with the field/s sent by the user
  // then return it as a response  
}

// replace a user
// NOTE: I DO NOT ADVISE TO REPLACE A WHOLE DOCUMENT
// I SUGGEST TO CREATE A NEW ONE INSTEAD TO AVOID DUPLICATION OF ID 
const replaceUser = async(id, user) => {
  // make a new object with the fields sent by the user but
  // the id will remain the same  
}

//delete a user
const deleteUser = async(id) => {
  // find the resource by its id then return it
  // along with isDeleted and date of deletion keys as a response
}


module.exports = { getUsers, getUserById, addUser, modifyUser, replaceUser, deleteUser }