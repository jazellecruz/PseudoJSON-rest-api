const ErrorMessage = require("../classes/error")

const stringify = (entry) => {
  let string = JSON.stringify(entry)
  string =  string.split('"').join(' ').split('\\').join('')

  return string
}

const checkIfProcessed = (acknowledged, modified, method) => {
  let response

  if (acknowledged && modified) {
    response = {
      message: "Request successfully fulfilled!",
      method: action,
      acknowlegded: true,
      processed: true,
    }
  } else {
    response = new ErrorMessage("Request is acknowledged but not processed!")
  }

  return response
}

const isArrayOrString = (data) => {
  if(typeof data === "string") {
    return [data]
  } else if (Array.isArray(data)){
    return [...data]
  } else if(!data){
    return undefined;
  } else {
    throw new Error(`Entered value is: ${typeof data}, not a string nor an array!`)
  }
}

const sanitizeInput = (input) => {
  if(typeof input === "number") return input;

  let charsToEscape = {
    "<": "&lt;", 
    ">": "&gt;"
  }

  try{
    let inputToSanitize = input;
    let sanitizedInput = "";
    
    for(const char of inputToSanitize){
      if(char === "<" || char === ">") {
        sanitizedInput += charsToEscape[char]
      } else {
        sanitizedInput += char
      }
    }

    return sanitizedInput;

  } catch(err) {
    console.log("Error in sanitizing input:", err)
  }

}

module.exports = { stringify, checkIfProcessed, isArrayOrString, sanitizeInput }