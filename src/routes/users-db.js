const router = require("express").Router();
const { addUserOnDb, 
        modifyUserFromDb, 
        replaceUserFromDb, 
        deleteUserFromDb } = require("../queries/user");
const { authenticateUser } = require("../middlewares/auth");

router.use(authenticateUser);

router.post("/", async(req, res) => {
  let response = await addUserOnDb(req.body);
  res.send(response);
});

router.patch("/:id", async(req, res) => {
  let response = await modifyUserFromDb(req.params.id, req.body);
  res.send(response);
});

router.put("/:id", async(req, res) => {
  let response = await replaceUserFromDb(req.params.id, req.body);
  res.send(response);
});

router.delete("/:id", async(req, res) => {
  let response = await deleteUserFromDb(req.params.id);
  res.send(response);
});

module.exports = router