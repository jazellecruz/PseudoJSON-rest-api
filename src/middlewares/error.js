const {ClientError} = require("../classes/error");
const chalk = require("chalk");

const error = chalk.hex("#e03453");

const errorHandler = (err, req, res, next) => {
  console.log(`${error.italic("Error Type")}: ${err.constructor.name}`);
  console.log(error("***START OF ERROR***"));
  console.log(err);
  console.log(error("***END OF ERROR***"));

  if(err instanceof ClientError) {
    return res.status(err.httpCode).send(err.clientMessage);
  }

  res.status(500).send("Oops! Something went wrong. Please try again later.");
}

module.exports = errorHandler