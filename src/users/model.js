const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const User = sequelize.define(
    "user",
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = User;