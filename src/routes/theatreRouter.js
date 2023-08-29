const router = require("express").Router()
const { getMoviesForDate, getSeatsForMovie, bookSeats } = require("../controllers/theatreController")

router.get("/:id/:date", getMoviesForDate)
router.route("/:id/:date/movies/:movieId/showtime/:showtimeId")
	.get(getSeatsForMovie)
router.route("/:id/:date/movies/:movieId/showtime/:showtimeId/book")
	.post(bookSeats)

module.exports = router