const bcrypt = require("bcrypt");
const User = require("../users/model");

exports.hashPassword = async (req, res, next) => {
    const saltRounds = parseInt(process.env.SALT_ROUNDS);

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        req.body.password = hashedPassword;

        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

exports.comparePassword = async (req, res, next) => {
    const { password, email } = req.body;

    try {
        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "account not found." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "invalid credentials" });
        }

        req.user = { id: user.id, email: user.email, username: user.username };

        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};
