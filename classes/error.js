
class ErrorMessage{
  constructor(message, error = undefined , code = undefined) {
    this.message = message,
    this.error =  error
    this.code = code
  }
}

module.exports = ErrorMessage