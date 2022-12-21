
const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello from '/posts' route!")
  // get all posts 
})

router.get("/:id", (req, res) => {
  // get post by id
})

router.post("/", (req, res) => {
// add a new post 
})

router.patch("/:id", (req, res) => {
  // modify a post 
})

router.put("/:id", (req, res) => {
  // replace a post 
})

router.delete("/:id", (req, res) => {
  // delete a post 
})

module.exports = router