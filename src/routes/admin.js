const router = require("express").Router();
const Admin = require("../models/admin");
const bcrypt = require("bcrypt")
const { generateToken } = require("../utils/jwt")
const { sanitizeInput } = require("../helpers/helpers")
const { verifyAdminUser } = require("../queries/admin");
const { ServerError, ClientError } = require("../classes/error")
const saltRounds = 10;

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

router.post("/sign-up", async(req, res, next) => {
  let id = sanitizeInput(req.body.id);
  let username = sanitizeInput(req.body.username);
  let password = sanitizeInput(req.body.password);

  try{ 
    let hashedPassword = await bcrypt.hash(password, saltRounds);

    let newAdmin = new Admin({
      id: id,
      username: username,
      password: hashedPassword
    });

    await newAdmin.save();
    
    res.send("Successfully added admin user.");
  } catch(err) {
    next(new ServerError(err));
  }

});

module.exports = router