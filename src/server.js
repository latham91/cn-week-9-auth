require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Route imports
const userRoutes = require("./users/routes");
const User = require("./users/model");

const port = process.env.PORT || 5001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

const syncTables = async () => {
    await User.sync();
};

// Routes
app.use("/users", userRoutes);

app.listen(port, () => {
    syncTables();
    console.log(`Server is running on port ${port}`);
});
