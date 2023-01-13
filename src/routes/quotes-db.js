const router= require("express").Router();
const { addQuoteOnDb, 
        modifyQuoteFromDb, 
        replaceQuoteFromDb, 
        deleteQuoteFromDb } = require("../queries/quote");
const { authenticateUser } = require("../middlewares/auth");


router.post("/", authenticateUser, async(req, res) => {
  let response = await addQuoteOnDb(req.body)
  res.send(response);
});


router.patch("/:id", authenticateUser, async(req, res) => {
  let response = await modifyQuoteFromDb(req.params.id, req.body);
  res.send(response)
});


router.put("/:id", authenticateUser, async(req, res) => {
  let response = await replaceQuoteFromDb(req.params.id, req.body);
  res.send(response)
});


router.delete("/:id", authenticateUser, async(req, res) => {
  let response = await deleteQuoteFromDb(req.params.id);
  res.send(response);
});


module.exports = router
