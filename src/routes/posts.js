
const router = require("express").Router();
const { getPosts, 
        getPostById, 
        addPost, 
        modifyPost, 
        replacePost, 
        deletePost } = require("../queries/post");

router.get("/", async(req, res, next) => {
  try {
    let response = await getPosts(req.query);
    res.send(response);
  } catch(err) {
    next(err);
  }
});

router.get("/:id", async(req, res, next) => {
  try{
    let response = await getPostById(req.params.id);
    res.send(response);
  } catch(err) {
    next(err);
  }
});

router.post("/", async(req, res, next) => {
  try{
    let response = await addPost(req.body);
    res.send(response);
  } catch(err) {
    next(err);
  }
});

router.patch("/:id", async(req, res, next) => {
  try{
    let response = await modifyPost(req.params.id, req.body);
    res.send(response);
  } catch(err) {
    next(err);
  }
});

router.put("/:id", async(req, res, next) => {
  try{
    let response = await replacePost(req.params.id, req.body);
    res.send(response);
  } catch(err) {
    next(err);
  }
});

router.delete("/:id", async(req, res, next) => {
  try{
    let response = await deletePost(req.params.id);
    res.send(response);
  } catch(err) {
    next(err);
  }
});

module.exports = router