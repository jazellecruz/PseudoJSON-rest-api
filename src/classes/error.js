
class ErrorMessage{
  constructor(message, error = undefined , code = undefined) {
    this.status_code = code;
    this.error =  error;
    this.message = message;
  }
}

class APIError extends Error {
  constructor(httpCode, clientMessage, err){
    super(err)

    // this.type = type
    this.httpCode = httpCode;
    this.clientMessage = clientMessage;
    // this.details = details
  }
}
module.exports = {ErrorMessage, APIError}