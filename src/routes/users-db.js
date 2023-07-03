const router = require("express").Router();
const { addUserOnDb, 
        modifyUserFromDb, 
        replaceUserFromDb, 
        deleteUserFromDb } = require("../queries/user-db");
const { authenticateUser } = require("../middlewares/auth");


router.use(authenticateUser);

router.post("/", async(req, res, next) => {
  try{
    let response = await addUserOnDb(req.body);
    res.send(response);
  } catch(err) {
    next(err);
  }
});

router.patch("/:id", async(req, res, next) => {
  try{
    let response = await modifyUserFromDb(req.params.id, req.body);
    res.send(response);
  } catch(err) {
    next(err);
  }
});

router.put("/:id", async(req, res, next) => {
  try{
    let response = await replaceUserFromDb(req.params.id, req.body);
    res.send(response);
  } catch(err) {
    next(err);
  }
});

router.delete("/:id", async(req, res, next) => {
  try{
    let response = await deleteUserFromDb(req.params.id);
    res.send(response);
  } catch(err) {
    next(err);
  }
});

module.exports = router