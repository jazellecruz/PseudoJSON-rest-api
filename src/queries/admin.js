const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const {options} = require("../constants/constants")

const verifyAdminUser = async(username, password) => {
  try{
    let foundUser = await Admin.find({username : username}, options)

    if(!foundUser[0]) return false;

    let isPasswordMatched = await bcrypt.compare(password, foundUser[0].password)

    return isPasswordMatched;
  } catch(err){
    console.log("An error occured in finding user from database:", err)
  }

}

module.exports = {verifyAdminUser}