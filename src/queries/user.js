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
  let { id, firstName, lastName, middleName, gender, birthDate, email, phone, imgUrl } = entry;

  try {
    const newUser = new User({
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
  
    response = {
      user: newUser,
      isAdded: true,
      addedOn: new Date().toUTCString()
    }

  } catch(err){
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }

  return response
}

// update or modify a user 
const modifyUser = async(userId, entry) => {
  let response;
  let { id, firstName, lastName, middleName, gender, birthDate, email, phone, imgUrl } = entry;

  try {
    let result = await User.find({ id : userId }, options);

    if (!result.length) {
      response = new ErrorMessage(
        `User with id: ${id} does not exist.`,
        error = "Resources Not Found.",
        code = 404
        )
    } else {
      let updatedUser = {
        id: userId,
        firstName: firstName || result.firstName,
        lastName: lastName || result.lastName,
        middleName: middleName || result.middleName,
        gender: gender || result.gender,
        birthDate: birthDate || result.birthDate,
        email: email || result.email,
        phone: phone || result.phone,
        imgUrl: imgUrl || result.imgUrl
      }

      response = {
        user: updatedUser,
        isModified: true,
        modifiedOn: new Date().toUTCString()
      }

    }
    
  } catch(err){
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }

  return response
}

// replace a user
// NOTE: I DO NOT ADVISE TO REPLACE A WHOLE DOCUMENT
// I SUGGEST TO CREATE A NEW ONE INSTEAD TO AVOID DUPLICATION OF ID 
const replaceUser = async(id, user) => {
  let response
  let { firstName, lastName, middleName, gender, birthDate, email, phone, imgUrl } = entry;

  try {
    let result = await User.find({ id : id }, options);

    if (!result.length) {
      response = new ErrorMessage(
        `User with id: ${id} does not exist.`,
        error = "Resources Not Found.",
        code = 404
        )
    } else {
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

      response = {
        user: newUser,
        isReplaced: true,
        replacedOn: new Date().toUTCString()
      }
    }
  }catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }

  return response
}
//delete a user
const deleteUser = async(id) => {
  let response

  try {
    let result = await User.find({ id : id }, options);

    if (!result.length) {
      response = new ErrorMessage(
        `User with id: ${id} does not exist.`,
        error = "Resources Not Found.",
        code = 404
        )
    } else {
      response = {
        user: result,
        isDeleted: true,
        deletedOn: new Date().toUTCString()
      }
    }
  }catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }

  return response
}


module.exports = { getUsers, getUserById, addUser, modifyUser, replaceUser, deleteUser }