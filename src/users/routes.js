const router = require("express").Router();

const { verifyToken } = require("../middleware/verifytoken");
const { hashPassword, comparePassword } = require("../middleware/auth");
const { createUser, signInUser, getAllUsers, verifyUser } = require("./controllers");

router.get("/", verifyToken, getAllUsers);
router.post("/signup", hashPassword, createUser);
router.post("/signin", comparePassword, signInUser);
router.post("/verify", verifyToken, verifyUser);

module.exports = router;
