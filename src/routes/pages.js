const router = require("express").Router();

// hoome page
router.get("/", (req, res) => {
  res.render("home", {title: "A simple REST API for dummy data"});
});

// documentation page
router.get("/docs", (req, res) => {
  res.render("docs", {title: "Documentation"});
});

// about page / credits page
router.get("/about", (req, res) => {
  res.render("about", {title: "About"});
});

module.exports = router