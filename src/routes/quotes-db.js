const router= require("express").Router();
const { addQuoteOnDb, 
        modifyQuoteFromDb, 
        replaceQuoteFromDb, 
        deleteQuoteFromDb } = require("../queries/quote-db");
const { authenticateUser } = require("../middlewares/auth");

router.use(authenticateUser);

router.post("/", async(req, res, next) => {
  try{
    let response = await addQuoteOnDb(req.body)
    res.send(response);
  } catch(err) {
    next(err);
  }
});

router.patch("/:id", async(req, res, next) => {
  try{
    let response = await modifyQuoteFromDb(req.params.id, req.body);
    res.send(response);
  } catch(err) {
    next(err);
  }
});

router.put("/:id", async(req, res, next) => {
  try{
    let response = await replaceQuoteFromDb(req.params.id, req.body);
    res.send(response)
  } catch(err) {
    next(err);
  }
});

router.delete("/:id", async(req, res, next) => {
  try{
    let response = await deleteQuoteFromDb(req.params.id);
    res.send(response);
  } catch(err) {
    next(err);
  }
});


module.exports = router
