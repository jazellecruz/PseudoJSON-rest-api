
const express = require("express");
const router = express.Router();
const Quote = require("../models/quotesModel");
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

router.put("/quotes/:id", (req, res) => {
  let quoteId = req.params.id 

  Quote.replaceOne({ id : quoteId },
    { 
      id : req.body.id,
      author: req.body.author,
      quote: req.body.quote,
      category: req.body.category
    },
    (err, response) => {
        if (response.acknowledged && response.modifiedCount) {
          res.send("Document is successfully modified!")
        } else if (err){
          res.send(err);
        }
      }
    )
});

router.delete("/quotes/:id", async(req, res) => {
  try {
    Quote.deleteOne({ id : req.params.id }, (err, response) => {
      if (response) {
        res.send("Successfully deleted document!")
      } else if (err) {
        res.send(`An error occured while performing deletion: ${err}`)
      }
    })
  } catch(error) {
    res.status(505).send(error)
  }
});

module.exports = router
