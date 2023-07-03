const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const {options}= require("../constants/constants");
const {ClientError, ServerError} = require("../classes/error");

const authenticateUser = async(req, res, next) => {
  // this is only for postman
  try{
    // Object.getOwnPropertySymbols => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols
    // Symbols => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
    let cookie = req[Object.getOwnPropertySymbols(req)[1]].cookie
    
    if(!cookie) {
      throw new ClientError(null, 401, "No token for authentication received.", "Unauthorized: No token received");
    }

    let accessToken = cookie.split("=")[1];
    let decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
    let foundUser = await Admin.find({username : decoded.user}, options);

    if(!foundUser[0]){
      throw new ClientError(null, 401, "Access denied", "Unauthorized: Invalid user credentials");     
    }

    next();
  } catch(err) {
    // catch and rethrow client error to avoid duplication
    if(err instanceof ClientError) {
      return next(err);  
    }

    // catch the errors thrown by jwt
    if(err.name === "JsonWebTokenError"){
      return next(new ClientError(null, 401, "Invalid Token", "JWT Error: Invalid token"));
    }

    if(err.name === "TokenExpiredError"){
      return next(new ClientError(null, 401, "Expired Token. Relogin again.", "JWT Error: Expired token"));
    }

    if(err.name === "NotBeforeError"){
      return next(new ClientError(null, 401, "Token not yet active for verification.", "JWT Error: Inactive token"));
    }

    next(new ServerError(err));
  }

}
module.exports = { authenticateUser }