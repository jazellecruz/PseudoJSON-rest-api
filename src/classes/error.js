class ClientError extends Error {
  constructor(status, httpCode, clientMessage, err){
    super(err);

    this.status = status;
    this.httpCode = httpCode;
    this.clientMessage = clientMessage;
  }

}

class ServerError extends Error {
  constructor(err){
    super(err);
  }
}

module.exports = {ClientError, ServerError}