const { DataTypes } = require('sequelize')
const sequelize = require("../config/database/dbConnect");

const Booking = sequelize.define("Booking", {}, {
	indexes: [{
		name: 'idx_bookings_showtime_screen',
		fields: [
			'ShowtimeId',
			'ScreenId'
		]
	}]
})

module.exports = {
	Booking
}