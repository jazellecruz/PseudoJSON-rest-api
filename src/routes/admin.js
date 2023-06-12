const router = require("express").Router();
const Admin = require("../models/admin");
const bcrypt = require("bcrypt")
const {options} = require("../constants/constants")

router.post("/login", async(req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  
  try{
    let foundUser = await Admin.find({username: username}, options)

    if(!foundUser[0]) {
      res.sendStatus(404);
      return;
    }

    let isPasswordMatched = await bcrypt.compare(foundUser[0].password, password)

    if(!isPasswordMatched) {
      res.sendStatus(401);
      return;
    }

    

  } catch(err){  
    res.send(err)
  }
});

router.post("/sign-up", async(req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  try{ 
    let hashedPassword = await bcrypt.hash(password, saltRounds);

    let newAdmin = new Admin({
      id: 1,
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