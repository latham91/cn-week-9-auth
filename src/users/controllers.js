const User = require("./model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

// Create a new user
// POST users/signup
// Public
exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
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

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = await User.create({ username, email, password: hashedPassword });

        return res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

// Sign in a user
// POST users/signin
// Public
exports.signInUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if email and password fields are not empty
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "email and password fields are required." });
        }

        // Check if user exists
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ success: false, message: "account not found." });
        }

        // Check if password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ success: false, message: "invalid credentials" });
        }

        // Create and assign JWT token
        const token = JWT.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Set cookie
        res.cookie("authToken", token, { httpOnly: true, maxAge: 3600000 });

        return res.status(200).json({ success: true, message: `account ${user.email} has logged in`, token });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

// Get all users
// GET users
// Private TODO: Add authentication middleware
exports.getAllUsers = async (req, res) => {
    try {
        // Return
        const users = await User.findAll({ attributes: { exclude: ["password"] } });

        return res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};
