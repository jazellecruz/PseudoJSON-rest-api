
const express = require("express");
const router = express.Router();
const query = require("../queries/quote")


router.get("/quotes", async(req, res) => {
  let response = await query.getQuotes(req.query);
  res.send(response);
});


router.get("/quotes/:id", async(req, res) => {
  let response = await query.getQuoteById(req.params.id);
  res.send(response)
});


router.post("/quotes", async(req, res) => {
  let response = await query.postQuote(req.body)
  res.send(response);
});


router.patch("/quotes/:id", async(req, res) => {
  let response = await query.modifyQuote(req.params.id, req.body);
  res.send(response)
});


router.put("/quotes/:id", async(req, res) => {
  let response = await query.replaceQuote(req.params.id, req.body);
  res.send(response)
});


router.delete("/quotes/:id", async(req, res) => {
  let response = await query.deleteQuote(req.params.id);
  res.send(response);
});


module.exports = router
