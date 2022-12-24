
const router = require("express").Router();
const query = require("../queries/post");

router.get("/", async(req, res) => {
  let response = await query.getPosts(req.query)
  res.send(response)
})

router.get("/:id", async(req, res) => {
  let response = await query.getPostById(req.params.id)
  res.send(response)
})

router.post("/", async(req, res) => {
  let response = await query.addPost(req.body)
  res.send(response)
})

router.patch("/:id", async(req, res) => {
  let response = await query.modifyPost(req.params.id, req.body)
  res.send(response)
})

router.put("/:id", async(req, res) => {
  let response = await query.replacePost(req.params.id, req.body)
  res.send(response)
})

router.delete("/:id", async(req, res) => {
  let response = await query.deletePost(req.params.id)
  res.send(response)
})

module.exports = router