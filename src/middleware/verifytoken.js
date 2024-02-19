const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    // Get token from cookies
    const token = req.cookies.authToken;

    // If token is not found
    if (!token) {
        res.clearCookie("authToken");
        return res.status(403).json({ success: false, message: "Access denied" });
    }

    // Verify token
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;

        next();
    } catch (error) {
        res.clearCookie("authToken");
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};
