const redis = require('redis');

const client = redis.createClient({
	password: process.env.REDIS_PASSWORD,
	socket: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT || 14903
	}
});

client.connect().then(() => {
	console.log('Connected to redis')
})


module.exports = client