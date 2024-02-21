const Book = require("./model");

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();

        if (!books) {
            return res.status(404).json({ success: false, message: "No books found" });
        }

        return res.status(200).json({ success: true, books });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

exports.createBook = async (req, res) => {
    const { title, author, genre, userId } = req.body;

    try {
        const book = await Book.create({ title, author, genre, userId });

        if (!title || !author || !genre) {
            return res.status(400).json({ success: false, message: "title, author and genre are required" });
        }

        return res.status(201).json({ success: true, book });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({ success: false, message: "book not found" });
        }

        await book.destroy();

        return res.status(200).json({ success: true, message: "book deleted" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};
