const router = require("express").Router();
const Admin = require("../models/admin");
const bcrypt = require("bcrypt")
const {generateToken} = require("../utils/jwt")
const {options} = require("../constants/constants")

router.post("/login", async(req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  try{
    let foundUser = await Admin.find({username : username}, options)

    if(!foundUser[0]) {
      res.sendStatus(404);
      return;
    }

    // do not remove await doing so will immediately proceed to the next line of code.
    let isPasswordMatched = await bcrypt.compare(password, foundUser[0].password)

    if(!isPasswordMatched) {
      res.sendStatus(401);
      return;
    }

    let accessToken = generateToken(foundUser[0].username)

    res.cookie("_auth", accessToken, {
      // set to false for development only
      httpOnly: true,
      secure: true
    }).send("Proceed");

  } catch(err){  
    res.send(err)
  }
});

router.post("/sign-up", async(req, res) => {
  let id = req.body.id;
  let username = req.body.username;
  let password = req.body.password;

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