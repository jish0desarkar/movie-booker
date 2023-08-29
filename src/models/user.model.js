const { DataTypes } = require('sequelize')
const sequelize = require("../config/database/dbConnect")

const User = sequelize.define('User', {
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	name: {
		type: DataTypes.STRING
	}
})

module.exports = {
	User
}