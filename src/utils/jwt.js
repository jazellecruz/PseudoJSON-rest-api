const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  try{
    let accessToken = jwt.sign({user: user}, process.env.ACCESS_SECRET_KEY, { expiresIn: '1h' })
    return accessToken;
  } catch(err) {
    throw err;
  }
}

module.exports = {generateToken}