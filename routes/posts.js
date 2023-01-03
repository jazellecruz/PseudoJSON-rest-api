
const router = require("express").Router();
const { getPosts, 
        getPostById, 
        addPost, 
        modifyPost, 
        replacePost, 
        deletePost } = require("../queries/post");
const { authenticateUser } = require("../middlewares/auth");

router.get("/", async(req, res) => {
  let response = await getPosts(req.query)
  res.send(response)
})

router.get("/:id", async(req, res) => {
  let response = await getPostById(req.params.id)
  res.send(response)
})

router.post("/", authenticateUser, async(req, res) => {
  let response = await addPost(req.body)
  res.send(response)
})

router.patch("/:id", authenticateUser, async(req, res) => {
  let response = await modifyPost(req.params.id, req.body)
  res.send(response)
})

router.put("/:id", authenticateUser, async(req, res) => {
  let response = await replacePost(req.params.id, req.body)
  res.send(response)
})

router.delete("/:id", authenticateUser, async(req, res) => {
  let response = await deletePost(req.params.id)
  res.send(response)
})

module.exports = router