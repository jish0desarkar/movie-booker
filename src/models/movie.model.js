const { DataTypes } = require('sequelize');
const sequelize = require("../config/database/dbConnect");

const Movie = sequelize.define("Movie", {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	language: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	format: {
		type: DataTypes.STRING,
		allowNull: false,
	}
})
module.exports = { Movie } 