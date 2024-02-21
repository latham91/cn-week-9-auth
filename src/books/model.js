const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Book = sequelize.define("book", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    },
});

module.exports = Book;
