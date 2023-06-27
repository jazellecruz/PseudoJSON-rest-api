const User = require("../models/user");
const ApiResponse = require("../classes/apiResponse");
const {ClientError, ServerError} = require("../classes/error");
const { stringify } = require("../helpers/helpers");
const { options } = require("../constants/constants");

//get all users
const getUsers = async(query) => {
  try {
    let limit = query.pageSize
    let page = query.page - 1

    let result = await User.find(query, options)
    .limit(limit)
    .skip(limit * page)
    .sort({ id : 1 });

    let totalCountDocs = await User.countDocuments(query);

    if (!result.length) {
      throw new ClientError(
        null,
        404, 
        `User with conditions : ${stringify(query)} does not exist.`, 
        "Resource Not Found: No resource found matching the provided criteria."
      );
    } 

    let response = new ApiResponse(
      result, 
      "users", 
      totalCountDocs, 
      page = query.page, 
      limit = limit
    );

    return response;
  } catch(err) {
    if(err instanceof ClientError){
      throw err;
    }  

    throw new ServerError(err);
  }
}


// get user by id
const getUserById = async(id) => {
  try {
    let result = await User.find({ id : id }, options);

    if (!result.length) {
      throw new ClientError(
        null,
        404, 
        `User with id : ${id} does not exist.`, 
        "Resource Not Found: No resource found matching the provided criteria."
      );
    }

    return result[0];
  } catch(err) {
    if(err instanceof ClientError){
      throw err;
    }  

    throw new ServerError(err);
  }
}

//add a new user 
const addUser = async(entry) => {
  try {
    let { id, firstName, lastName, middleName, gender, birthDate, email, phone, imgUrl } = entry;

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
    });
  
    response = {
      user: newUser,
      isAdded: true,
      addedOn: new Date().toUTCString()
    }

    return response;
  } catch(err){
    throw new ServerError(err);
  }
}

// update or modify a user 
const modifyUser = async(id, entry) => {
  try {
    let { firstName, lastName, middleName, gender, birthDate, email, phone, imgUrl } = entry;

    let result = await User.find({ id : id }, options);

    if (!result.length) {
      throw new ClientError(
        null ,
        404, 
        `User with id : ${id} does not exist.`, 
        "Resource Not Found: No resource found matching the provided criteria."
      );
    } 

    let modifiedUser = {
      id: id,
      firstName: firstName || result[0].firstName,
      lastName: lastName || result[0].lastName,
      middleName: middleName || result.middleName,
      gender: gender || result[0].gender,
      birthDate: birthDate || result[0].birthDate,
      email: email || result[0].email,
      phone: phone || result[0].phone,
      imgUrl: imgUrl || result[0].imgUrl
    }

    let response = {
      user: modifiedUser,
      isModified: true,
      modifiedOn: new Date().toUTCString()
    }

    return response;
  } catch(err){
    if(err instanceof ClientError){
      throw err;
    }  

    throw new ServerError(err);
  }
}

// replace a user
const replaceUser = async(id, user) => {
  try {
    let { firstName, lastName, middleName, gender, birthDate, email, phone, imgUrl } = user;
    let result = await User.find({ id : id }, options);

    if (!result.length) {
      throw new ClientError(
        null,
        404, 
        `User with id : ${id} does not exist.`, 
        "Resource Not Found: No resource found matching the provided criteria."
      );
    } 

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
    });

    let  response = {
      user: newUser,
      isReplaced: true,
      replacedOn: new Date().toUTCString()
    }

    return response;
  } catch(err) {
    if(err instanceof ClientError){
      throw err;
    }  

    throw new ServerError(err);
  }
}

//delete a user
const deleteUser = async(id) => {
  try {
    let result = await User.find({ id : id }, options);

    if (!result.length) {
      throw new ClientError(
        null,
        404, 
        `User with id : ${id} does not exist.`, 
        "Resource Not Found: No resource found matching the provided criteria."
      );
    } 

    let response = {
      user: result,
      isDeleted: true,
      deletedOn: new Date().toUTCString()
    }

    return response;
  } catch(err) {
    if(err instanceof ClientError){
      throw err;
    }  

    throw new ServerError(err);
  }
}


module.exports = { getUsers, getUserById, addUser, modifyUser, replaceUser, deleteUser }