const router = require("express").Router();

const { verifyToken } = require("../middleware/verifytoken");
const { hashPassword, comparePassword } = require("../middleware/auth");
const { createUser, signInUser, getAllUsers } = require("./controllers");

router.get("/", verifyToken, getAllUsers);
router.post("/signup", hashPassword, createUser);
router.post("/signin", comparePassword, signInUser);

module.exports = router;
