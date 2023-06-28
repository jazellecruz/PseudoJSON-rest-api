const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const {options} = require("../constants/constants");
const {ServerError} = require("../classes/error")

const verifyAdminUser = async(username, password) => {
  try{
    let foundUser = await Admin.find({username : username}, options)

    if(!foundUser[0]) return false;

    let isPasswordMatched = await bcrypt.compare(password, foundUser[0].password)

    if(!isPasswordMatched) return false

    return foundUser[0].username
  } catch(err){
    throw new ServerError(err);
  }

}

module.exports = {verifyAdminUser}