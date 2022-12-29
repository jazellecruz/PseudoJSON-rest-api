const ErrorMessage = require("../classes/error")

const stringify = (entry) => {
  let string = JSON.stringify(entry)
  string =  string.split('"').join(' ').split('\\').join('')

  return string
}

const checkIfProcessed = (acknowledged, modified, action) => {
  let response

  if (acknowledged && modified) {
    response = {
      message: "Request successfully fulfilled!",
      action: action,
      acknowlegded: true,
      processed: true,
    }
  } else {
    response = new ErrorMessage("Request is acknowledged but not processed!")
  }

  return response
}


module.exports = { stringify, checkIfProcessed}