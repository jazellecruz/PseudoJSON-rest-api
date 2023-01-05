const router = require("express").Router();

// hoome page
router.get("/", (req, res) => {
  res.render("home");
});

// documentation page
router.get("/docs", (req, res) => {
  res.render("docs");
});

// about page / credits page
router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router