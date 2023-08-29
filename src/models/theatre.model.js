const { DataTypes } = require('sequelize')
const sequelize = require("../config/database/dbConnect");

const Theatre = sequelize.define("Theatre", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	}
})
module.exports = {
	Theatre
}