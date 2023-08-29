const { DataTypes } = require('sequelize')
const sequelize = require("../config/database/dbConnect");

const Seat = sequelize.define("Seat", {
	number: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	row: {
		type: DataTypes.STRING,
		allowNull: false
	},
	isBooked: {
		type: DataTypes.VIRTUAL,
	}
})
module.exports = {
	Seat
}