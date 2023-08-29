const { forEach } = require("lodash")

const assertModelAssociations = (sequelize) => {
	const { User, Booking, Seat, Showtime, Screen, Movie, Theatre } = sequelize.models

	User.hasMany(Booking)
	Booking.belongsTo(User)

	Theatre.hasMany(Screen)
	Screen.belongsTo(Theatre)

	Screen.hasMany(Seat)
	Seat.belongsTo(Screen)

	Screen.hasMany(Showtime)
	Showtime.belongsTo(Screen)

	Movie.hasMany(Showtime)
	Showtime.belongsTo(Movie)

	Screen.belongsToMany(Movie, { through: "ScreenMovie" })
	Movie.belongsToMany(Screen, { through: "ScreenMovie" })

	Showtime.hasMany(Booking)
	Booking.belongsTo(Showtime)

	Seat.belongsToMany(Booking, { through: "SeatBooking" })
	Booking.belongsToMany(Seat, { through: "SeatBooking" })
	// Booking.destroy({ truncate: { cascade: true } })

	Screen.hasMany(Booking)
	Booking.belongsTo(Screen)

}

module.exports = assertModelAssociations
