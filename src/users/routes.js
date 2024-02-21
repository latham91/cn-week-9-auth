const router = require("express").Router();

const { verifyToken } = require("../middleware/verifyToken");
const { validateEmail } = require("../middleware/emailValidation");
const { hashPassword, comparePassword } = require("../middleware/auth");
const {
    createUser,
    signInUser,
    getAllUsers,
    verifyUser,
    getUsersBooks,
    updateUserById,
    deleteUserById,
} = require("./controllers");

router.get("/", verifyToken, getAllUsers);
router.get("/:id/books", verifyToken, getUsersBooks);
router.post("/signup", validateEmail, hashPassword, createUser);
router.post("/signin", comparePassword, signInUser);
router.post("/verify", verifyToken, verifyUser);
router.patch("/:id", verifyToken, hashPassword, updateUserById);
router.delete("/:id", verifyToken, deleteUserById);

module.exports = router;
