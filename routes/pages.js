const router = require("express").Router();

// hoome page
router.get("/", (req, res) => {
  res.send("This is the homepage!")
});

// documentation page
router.get("/docs", (req, res) => {
  res.send("This is the documentation page!");
});

// about page / credits page
router.get("/about", (req, res) => {
  res.send("This is the about page!");
});

module.exports = router