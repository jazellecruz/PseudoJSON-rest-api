const router = require("express").Router();
const { getUsers, 
        getUserById, 
        addUser, 
        modifyUser, 
        replaceUser, 
        deleteUser } = require("../queries/user");

router.get("/", async(req, res, next) => {
  try{
    let response = await getUsers(req.query);
    res.send(response);
  } catch(err) {
    next(err);
  }
});

router.get("/:id", async(req, res, next) => {
  try{
    let response = await getUserById(req.params.id);
    res.send(response);
  } catch(err) {
    next(err);
  }
});

router.post("/", async(req, res, next) => {
  try{
    let response = await addUser(req.body);
    res.send(response);
  } catch(err) {
    next(err);
  }
});

router.patch("/:id", async(req, res, next) => {
  try{
    let response = await modifyUser(req.params.id, req.body);
    res.send(response);
  } catch(err) {
    next(err);
  }
});

router.put("/:id", async(req, res, next) => {
  try{
    let response = await replaceUser(req.params.id, req.body);
    res.send(response);
  } catch(err) {
    next(err);
  }
});

router.delete("/:id", async(req, res, next) => {
  try{
    let response = await deleteUser(req.params.id);
    res.send(response);
  } catch(err) {
    next(err);
  }
});

module.exports = router