const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const {options}= require("../constants/constants");
const {ClientError, ServerError} = require("../classes/error");

const authenticateUser = async(req, res, next) => {
  if(process.env.NODE_ENV === "development") {
    return next();
  }
  
  try{
    // Object.getOwnPropertySymbols => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols
    // Symbols => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
    let cookie = req[Object.getOwnPropertySymbols(req)[1]].cookie
    
    if(!cookie) {
      throw new ClientError(null, 401, "No token for authentication received.", null);
    }

    let accessToken = cookie.split("=")[1];
    let decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
    let foundUser = await Admin.find({username : decoded.user}, options);

    if(!foundUser[0]){
      throw new ClientError(null, 401, "Unauthorized", null);     
    }

    next();
  } catch(err) {
    // catch the err thrown when there is no cookie in the headers
    if(err instanceof ClientError) {
      throw err;  
    }

    // Client side JWT errors
    if(err.name === "JsonWebTokenError"){
      throw new ClientError(null, 401, "Invalid Token", null);
    }

    if(err.name === "TokenExpiredError"){
      throw new ClientError(null, 401, "Expired Token. Relogin again.", null);
    }

    if(err.name === "NotBeforeError"){
      throw new ClientError(null, 401, "Token not yet active for verification.", null);
    }

    throw new ServerError(err);
  }

}
module.exports = { authenticateUser }