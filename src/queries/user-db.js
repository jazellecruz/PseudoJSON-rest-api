const User = require("../models/user")
const {ServerError} = require("../classes/error");

// functions for modyfing the actual database

// add new user
const addUserOnDb = async(entry) => {
  try{
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
    });

    let response = await newUser.save();

    return response; 
  } catch(err) {
    throw new ServerError(err);
  }
}

// modify a single user
const modifyUserFromDb = async(id, entry) => {
  try{
    let result = await User.updateOne({ id : id }, { $set : entry });

    let response = {
      isAcknowledged: !!result.acknowledged,
      isSuccessful: !!result.modifiedCount,
      modifiedCount: result.modifiedCount,
    }

    return response;
  } catch(err) {
    throw new ServerError(err);
  }
}

// replace a whole document
// id cannot be replaced
const replaceUserFromDb = async(id, entry) => {
  try{
    let userId = id
    let { 
      firstName,
      middleName,
      lastName,
      gender,
      birthDate,
      email,
      phone
    } = entry

    let result = await User.replaceOne({ id: userId }, {
      id: userId,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      gender: gender,
      birthDate: birthDate,
      email: email,
      phone: phone
    });

    let response = {
      isAcknowledged: !!result.acknowledged,
      isSuccessful: !!result.modifiedCount,
      modifiedCount: result.modifiedCount,
    }

    return response;
  } catch(err) {
    throw new ServerError(err);
  }
}

//delete a single user
const deleteUserFromDb = async(id) => {
  try{
    let result = await User.deleteOne({ id : id });

    let response = {
      isAcknowledged: !!result.acknowledged,
      isSuccessful: !!result.deletedCount,
      deletedCount: result.deletedCount,
    }

    return response;
  } catch(err) {
    throw new ServerError(err);
  }
}

module.exports = { addUserOnDb, modifyUserFromDb, replaceUserFromDb, deleteUserFromDb }