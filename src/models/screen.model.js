const { DataTypes } = require('sequelize');
const sequelize = require("../config/database/dbConnect");

const Screen = sequelize.define("Screen", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: "theatre_id"
	}
})
module.exports = {
	Screen
}