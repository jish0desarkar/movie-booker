const { DataTypes } = require('sequelize');
const sequelize = require("../config/database/dbConnect");

const Showtime = sequelize.define("Showtime", {
	time: {
		type: DataTypes.TIME,
		allowNull: false,
	},
	date: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	}
},
	{
		indexes: [{
			name: 'idx_showtimes_date',
			fields: [
				'date'
			]
		}]
	}
)

module.exports = {
	Showtime
}