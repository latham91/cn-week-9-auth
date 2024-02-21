const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const User = sequelize.define(
    "user",
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
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
        name: {
            type: DataTypes.STRING,
            defaultValue: "Unknown",
        },
    },
    { timestamps: true }
);

module.exports = User;
