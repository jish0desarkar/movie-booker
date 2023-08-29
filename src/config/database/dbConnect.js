require("dotenv").config()
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
	dialect: 'postgres',
	dialectOptions: {
		useUTC: false, // for reading from database
	},
	timezone: '+05:30',
	logging: false
})

const connectDB = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}
connectDB()

module.exports = sequelize