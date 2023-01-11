
const router= require("express").Router();
const { getQuotes, 
        getQuoteById, 
        postQuote, 
        modifyQuote, 
        replaceQuote, 
        deleteQuote } = require("../queries/quote");
const { authenticateUser } = require("../middlewares/auth");

router.get("/", async(req, res) => {
  let response = await getQuotes(req.query);
  res.send(response);
});


router.get("/:id", async(req, res) => {
  let response = await getQuoteById(req.params.id);
  res.send(response)
});


router.post("/", authenticateUser, async(req, res) => {
  let response = await postQuote(req.body)
  res.send(response);
});


router.patch("/:id", authenticateUser, async(req, res) => {
  let response = await modifyQuote(req.params.id, req.body);
  res.send(response)
});


router.put("/:id", authenticateUser, async(req, res) => {
  let response = await replaceQuote(req.params.id, req.body);
  res.send(response)
});


router.delete("/:id", authenticateUser, async(req, res) => {
  let response = await deleteQuote(req.params.id);
  res.send(response);
});


module.exports = router
