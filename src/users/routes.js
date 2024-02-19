const router = require("express").Router();

const { verifyToken } = require("../middleware/verifytoken");
const { createUser, signInUser, getAllUsers } = require("./controllers");

router.get("/", verifyToken, getAllUsers);
router.post("/signup", createUser);
router.post("/signin", signInUser);

module.exports = router;
