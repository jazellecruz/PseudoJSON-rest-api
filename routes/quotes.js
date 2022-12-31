
const router= require("express").Router();
const query = require("../queries/quote")

router.get("/", async(req, res) => {
  let response = await query.getQuotes(req.query);
  res.send(response);
});


router.get("/:id", async(req, res) => {
  let response = await query.getQuoteById(req.params.id);
  res.send(response)
});


router.post("/", async(req, res) => {
  let response = await query.postQuote(req.body)
  res.send(response);
});


router.patch("/:id", async(req, res) => {
  let response = await query.modifyQuote(req.params.id, req.body);
  res.send(response)
});


router.put("/:id", async(req, res) => {
  let response = await query.replaceQuote(req.params.id, req.body);
  res.send(response)
});


router.delete("/:id", async(req, res) => {
  let response = await query.deleteQuote(req.params.id);
  res.send(response);
});


module.exports = router
