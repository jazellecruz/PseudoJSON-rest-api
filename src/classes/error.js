class ClientError extends Error {
  constructor(type, httpCode, clientMessage, err){
    super(err);

    this.type = type;
    this.httpCode = httpCode;
    this.clientMessage = clientMessage
  }
}

class ServerError extends Error {
  constructor(err){
    super(err);
  }
}

module.exports = {ClientError, ServerError}