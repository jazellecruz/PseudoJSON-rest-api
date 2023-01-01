const router = require("express").Router();
const { getUsers, 
        getUserById, 
        addUser, 
        modifyUser, 
        replaceUser, 
        deleteUser } = require("../queries/user");

router.get("/", async(req, res) => {
  let response = await getUsers(req.query);
  res.send(response);
});

router.get("/:id", async(req, res) => {
  let response = await getUserById(req.params.id);
  res.send(response);
});

router.post("/", async(req, res) => {
  let response = await addUser(req.body);
  res.send(response);
});

router.patch("/:id", async(req, res) => {
  let response = await modifyUser(req.params.id, req.body);
  res.send(response);
});

router.put("/:id", async(req, res) => {
  let response = await replaceUser(req.params.id, req.body);
  res.send(response);
});

router.delete("/:id", async(req, res) => {
  let response = await deleteUser(req.params.id);
  res.send(response);
});

module.exports = router