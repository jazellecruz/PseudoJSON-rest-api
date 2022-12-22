
const router = require("express").Router();
const query = require("../queries/post");

router.get("/", async(req, res) => {
  let response = await query.getPosts(req.query)
  res.send(response)
})

router.get("/:id", async(req, res) => {
  // get post by id
})

router.post("/", async(req, res) => {
// add a new post 
})

router.patch("/:id", async(req, res) => {
  // modify a post 
})

router.put("/:id", async(req, res) => {
  // replace a post 
})

router.delete("/:id", async(req, res) => {
  // delete a post 
})

module.exports = router