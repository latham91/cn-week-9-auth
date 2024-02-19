const router = require("express").Router();

const { createUser, signInUser, getAllUsers } = require("./controllers");

router.get("/", getAllUsers);
router.post("/signup", createUser);
router.post("/signin", signInUser);

module.exports = router;
