const jwt = require("jsonwebtoken");
const Admin = require("../models/admin")
const {options}= require("../constants/constants")

const authenticateUser = async(req, res, next) => {
  try{
    // Object.getOwnPropertySymbols => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols
    // Symbols => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
    let cookie = req[Object.getOwnPropertySymbols(req)[1]].cookie
    
    if(!cookie) {
      return res.status(401).send("No token for authentication received.");
    }

    let accessToken = cookie.split("=")[1];
    let decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
    let foundUser = await Admin.find({username : decoded.user}, options);

    if(!foundUser[0]){
      return res.send(401).send("YOU SHALL NOT PASS");
    }

    next();
  } catch(err) {
    // JWT ERRORS
    if(err.name === "JsonWebTokenError"){
      return res.status(401).send("Invalid Token");
    }

    if(err.name === "TokenExpiredError"){
      return res.status(401).send("Expired Token. Relogin again.")
    }

    if(err.name === "NotBeforeError"){
      return res.status(401).send("Token not yet active for verification.")
    }

    res.status(500).send("There was an error validating your token.")
  }

}
module.exports = { authenticateUser }