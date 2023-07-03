const router = require("express").Router();
const {ServerError} = require("../classes/error");

// hoome page
router.get("/", (req, res, next) => {
  try{
    res.render("home", {title: "A simple REST API for dummy data"});
  } catch(err) {
    next(new ServerError(err));
  }
});

// documentation page
router.get("/docs", (req, res, next) => {
  try{
    res.render("docs", {title: "Documentation"});
  } catch(err) {
    next(new ServerError(err));
  }
});

// about page / credits page
router.get("/about", (req, res, next) => {
  try{
    res.render("about", {title: "About"});
  } catch(err) {
    next(new ServerError(err));
  }
});

module.exports = router