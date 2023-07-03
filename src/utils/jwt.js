const jwt = require("jsonwebtoken");
const {ServerError} = require("../classes/error")

const generateToken = (user) => {
  try{
    let accessToken = jwt.sign({user: user}, process.env.ACCESS_SECRET_KEY, { expiresIn: '6h' })
    return accessToken;
  } catch(err) {
    throw new ServerError(err);
  }
}

module.exports = {generateToken}