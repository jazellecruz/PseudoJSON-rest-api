
const authenticateUser = (req, res, next) => {
  if (req.headers.secret_key === process.env.SECRET_KEY) {
    return next();
  } else {
    res.send({
      status_code: 401,
      error: "UNAUTHORIZED",
      err_message: "You are not authorized to make such requests!"
    })
  }
}
module.exports = { authenticateUser }