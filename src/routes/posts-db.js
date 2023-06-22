
const router = require("express").Router();
const { addPostOnDb, 
        modifyPostFromDb, 
        replacePostFromDb, 
        deletePostFromDb } = require("../queries/post-db");
const { authenticateUser } = require("../middlewares/auth");


router.use(authenticateUser);

router.post("/", async(req, res, next) => {
  try{
    let response = await addPostOnDb(req.body)
    res.send(response)
  } catch(err) {
    next(err);
  }
});

router.patch("/:id", async(req, res, next) => {
  try{
    let response = await modifyPostFromDb(req.params.id, req.body)
    res.send(response)
  } catch(err) {
    next(err)
  }
});

router.put("/:id", async(req, res, next) => {
  try{
    let response = await replacePostFromDb(req.params.id, req.body)
    res.send(response)
  } catch(err) {
    next(err);
  }
});

router.delete("/:id", async(req, res, next) => {
  try{
    let response = await deletePostFromDb(req.params.id)
    res.send(response)
  }catch(err){
    next(err);
  }
});


module.exports = router;