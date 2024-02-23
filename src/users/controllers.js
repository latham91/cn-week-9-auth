const User = require("./model");
const JWT = require("jsonwebtoken");

// Create a new user
// POST users/signup
// Public
exports.createUser = async (req, res) => {
    const { username, email, password, name } = req.body;

    try {
        // Check if email and password fields are not empty
        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "email, username and password fields are required." });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "password must be at least 6 characters long." });
        }

        // Check if email already exists
        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            return res.status(400).json({ success: false, message: "user with this email already exists." });
        }

        // Create a new user
        const newUser = await User.create({ username, email, password, name });

        return res.status(201).json({ success: true, message: "user created", data: newUser });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

// Sign in a user
// POST users/signin
// Public
exports.signInUser = async (req, res) => {
    const { id, username, email, name } = req.user;

    try {
        // Create and assign JWT token
        const token = JWT.sign({ id, email, username, name }, process.env.JWT_SECRET, { expiresIn: "1m" });

        // Set cookie
        res.cookie("authToken", token, { httpOnly: true, expires: new Date(Date.now() + 60000) });

        return res.status(200).json({ success: true, message: `account ${email} has logged in`, token });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

// Get all users
// GET users
// Private (requires jwt token)
exports.getAllUsers = async (req, res) => {
    try {
        // Return
        const users = await User.findAll({ attributes: { exclude: ["password"] } });

        return res.status(200).json({ success: true, message: "all users returned", count: users.length, users }); // user is for testing purposes only
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

exports.getUsersBooks = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { attributes: { exclude: ["password"] }, include: "books" });

        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" });
        }

        return res.status(200).json({ success: true, message: "user's books returned", user });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

exports.updateUserById = async (req, res) => {
    const { id } = req.params;
    const { email, username, password, name } = req.body;

    if (parseInt(req.body.id) !== parseInt(id)) {
        return res.status(403).json({ success: false, message: "unauthorized" });
    }

    if (!email || !username || !password || !name) {
        return res
            .status(400)
            .json({ success: false, message: "email, username, name, and password fields are required." });
    }

    try {
        const user = await User.update({ email, username, password, name }, { where: { id } });

        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" });
        }

        return res.status(200).json({ success: true, message: "user updated", user });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

exports.deleteUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.destroy({ where: { id } });

        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" });
        }

        return res.status(200).json({ success: true, message: "user deleted", user });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

exports.verifyUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { attributes: { exclude: ["password"] } });

        return res.status(200).json({ success: true, message: "user verified", user });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};
