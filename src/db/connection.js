const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.MYSQL_URI);

sequelize.authenticate();
console.log(`Connected to MySQL database successfully!`);

module.exports = sequelize;
