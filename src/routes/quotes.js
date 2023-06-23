
const router= require("express").Router();
const { getQuotes, 
        getQuoteById, 
        addQuote, 
        modifyQuote, 
        replaceQuote, 
        deleteQuote } = require("../queries/quote");

router.get("/", async(req, res, next) => {
  try {
    let response = await getQuotes(req.query);
    res.send(response);
  } catch(err) {
    next(err);
  }
});


router.get("/:id", async(req, res, next) => {
  try {
    let response = await getQuoteById(req.params.id);
    res.send(response);
  } catch(err) {
    next(err);
  }
});


router.post("/", async(req, res, next) => {
  try {
    let response = await addQuote(req.body);
    res.send(response);
  } catch(err) {
    next(err);
  }
});


router.patch("/:id", async(req, res, next) => {
  try {
    let response = await modifyQuote(req.params.id, req.body);
    res.send(response);
  } catch(err) {
    next(err);
  }
});


router.put("/:id", async(req, res, next) => {
  try {
    let response = await replaceQuote(req.params.id, req.body);
    res.send(response);
  } catch(err) {
    next(err);
  }
});


router.delete("/:id", async(req, res, next) => {
  try {
    let response = await deleteQuote(req.params.id);
    res.send(response);
  } catch(err) {
    next(err);
  }
});


module.exports = router
