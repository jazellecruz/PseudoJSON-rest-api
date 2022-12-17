
class ErrorMessage{
  constructor(message, error = undefined , code = undefined) {
    this.code = code;
    this.error =  error;
    this.message = message;
  }
}

module.exports = ErrorMessage