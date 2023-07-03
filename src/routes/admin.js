const router = require("express").Router();
const { generateToken } = require("../utils/jwt");
const { sanitizeInput } = require("../helpers/helpers");
const { verifyAdminUser } = require("../queries/admin");
const { ServerError, ClientError } = require("../classes/error");

router.post("/login", async(req, res, next) => {
  let username = sanitizeInput(req.body.username);
  let password = sanitizeInput(req.body.password);

  try{
    let verifiedUser = await verifyAdminUser(username, password)

    if(!verifiedUser) {
      throw new ClientError(null, 401, "Access denied.", "Unauthorized: Invalid user credentials.")
    }

    let accessToken = generateToken(verifiedUser);

    res.cookie("_auth", accessToken, {
      httpOnly: true,
      secure: true
    }).send("Proceed");

  } catch(err){ 
    if(err instanceof ClientError) {
      return next(err);
    }

    next(new ServerError(err));
  }
});


module.exports = router