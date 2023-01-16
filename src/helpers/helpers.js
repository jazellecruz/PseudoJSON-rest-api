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

module.exports = { stringify, checkIfProcessed, isArrayOrString }