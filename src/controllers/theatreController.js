const { models } = require("../config/database/dbConnect")
const { Sequelize } = require("sequelize")
const _ = require("lodash")
const redisClient = require("../config/redisSetup")

const getMoviesForDate = async (req, res) => {
	const { id, date } = req.params;
	let result = JSON.parse(await redisClient.get(`theatre:${id}:${date}`))
	if (!result) {
		result = await models.Theatre.findByPk(id, {
			include: {
				model: models.Screen,
				attributes: ["id", "name"],
				include: {
					required: true,
					model: models.Movie,
					attributes: ["id", "title", "language", "format"],
					through: {
						attributes: [] // To not include base table
					},
					include: {
						model: models.Showtime,
						required: true,
						attributes: ["id", "time", "date", "ScreenId"],
						where: {
							date,
							ScreenId: [Sequelize.col('Screens.id')]
						}
					}
				}
			}
		})
		redisClient.set(`theatre:${id}:${date}`, JSON.stringify(result))
	}
	res.send({ result }).status(200)
}

const getSeatsForMovie = async (req, res) => {
	const { movieId, showtimeId } = req.params;
	let showtime = JSON.parse(await redisClient.get(`showtime:${showtimeId}`))
	if (!showtime) {
		showtime = await models.Showtime.findByPk(showtimeId, {
			include: {
				model: models.Screen,
				include: {
					model: models.Seat,
					attributes: ["id", "number", "row"],
					order: [
						['id', 'DESC']
					]
				}
			}
		})
		redisClient.set(`showtime:${showtimeId}`, JSON.stringify(showtime))
	}
	const seats = showtime.Screen.Seats
	let bookings = JSON.parse(await redisClient.get(`booking:${showtimeId}:${showtime.Screen.id}`))
	if (!bookings) {
		bookings = await models.Booking.findAll({
			where: {
				ShowtimeId: showtimeId,
				ScreenId: showtime.Screen.id,
			},
			include: {
				model: models.Seat,
				through: {
					attributes: [] // To not include base table
				},
				where: {
					id: {
						[Sequelize.Op.in]: seats.map(seat => seat.id)
					}
				}
			}
		})
		redisClient.set(`booking:${showtimeId}:${showtime.Screen.id}`, JSON.stringify(bookings))
	}
	const bookedSeatIds = _.flatMap(bookings, booking => booking.Seats.map(seat => seat.id));
	seats.forEach(seat => {
		seat.isBooked = _.includes(bookedSeatIds, seat.id);
	});

	res.send({ seats }).status(200)
}


/**
 * Book seats for a showtime
 * 
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {void}
 */
const bookSeats = async (req, res) => {
	const { showtimeId, movieId } = req.params;
	const { email, seatIds } = req.body;
	const [user, created] = await models.User.findOrCreate({
		where: {
			email
		}
	});
	const showtime = await models.Showtime.findByPk(showtimeId, {
		include: {
			model: models.Screen,
			include: {
				model: models.Seat,
				attributes: ["id", "number", "row"]
			}
		}
	});

	// Filter the selected seats based on the seatIds provided
	const selectedSeats = _.filter(showtime.Screen.Seats, (seat) => _.includes(seatIds, seat.id));
	const booking = await models.Booking.create({
		ShowtimeId: showtimeId,
		ScreenId: showtime.Screen.id,
		UserId: user.id
	});

	// Associate the selected seats with the booking
	booking.addSeats(selectedSeats);

	// Delete the booking cache
	redisClient.del(`booking:${showtimeId}:${showtime.Screen.id}`);

	// Send the booking details in the response
	res.send({ booking });
}



module.exports = {
	getMoviesForDate,
	getSeatsForMovie,
	bookSeats
}