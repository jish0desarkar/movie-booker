require('dotenv').config()
const express = require('express')

const app = express()
const port = process.env.PORT || 2000
require("./src/config/database/dbSetup")
const { models } = require("./src/config/database/dbConnect")
const theatreRouter = require("./src/routes/theatreRouter")
const redisClient = require("./src/config/redisSetup")

// models.User.create({ email: "email", name: "name" })
// const a = models.Booking.create({ ShowtimeId: 7, SeatId: 3, UserId: 1, ScreenId: 1 })
c = 1
while (c < 500) {
	let b = models.Seat.create({ number: c, row: "A", ScreenId: 9 })
	c += 1
}

app.use(express.json())

app.use("/theatres", theatreRouter)

app.listen(port, () => console.log(`App listening on port ${port}!`))



