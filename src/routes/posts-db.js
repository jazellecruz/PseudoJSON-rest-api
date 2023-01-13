
const router = require("express").Router();
const { addPostOnDb, 
        modifyPostFromDb, 
        replacePostFromDb, 
        deletePostFromDb } = require("../queries/post-db");
const { authenticateUser } = require("../middlewares/auth");

router.post("/", authenticateUser, async(req, res) => {
  let response = await addPostOnDb(req.body)
  res.send(response)
})

router.patch("/:id", authenticateUser, async(req, res) => {
  let response = await modifyPostFromDb(req.params.id, req.body)
  res.send(response)
})

router.put("/:id", authenticateUser, async(req, res) => {
  let response = await replacePostFromDb(req.params.id, req.body)
  res.send(response)
})

router.delete("/:id", authenticateUser, async(req, res) => {
  let response = await deletePostFromDb(req.params.id)
  res.send(response)
})

module.exports = router;