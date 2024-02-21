const router = require("express").Router();

const { verifyToken } = require("../middleware/verifyToken");
const { getAllBooks, createBook, deleteBook } = require("./controllers");

router.get("/", verifyToken, getAllBooks);
router.post("/", verifyToken, createBook);
router.delete("/:id", verifyToken, deleteBook);

module.exports = router;
