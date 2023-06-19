const router = require("express").Router();
const Admin = require("../models/admin");
const bcrypt = require("bcrypt")
const {generateToken} = require("../utils/jwt")
const {sanitizeInput} = require("../helpers/helpers")
const {verifyAdminUser} = require("../queries/admin");

router.post("/login", async(req, res) => {
  let username = sanitizeInput(req.body.username);
  let password = sanitizeInput(req.body.password);

  try{
    let isUserVerified = await verifyAdminUser(username, password)

    if(!isUserVerified) {
      return res.sendStatus(401);
    }

    let accessToken = generateToken(foundUser[0].username)

    res.cookie("_auth", accessToken, {
      httpOnly: true,
      secure: true
    }).send("Proceed");

  } catch(err){  
    res.send(err)
  }
});

router.post("/sign-up", async(req, res) => {
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

    let response = await newAdmin.save()
    res.send(response)
  } catch(err) {
    console.log(err)
  }

});

module.exports = router