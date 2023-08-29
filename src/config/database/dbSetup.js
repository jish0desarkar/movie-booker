const sequelize = require("./dbConnect")
const loadModels = require("../../helpers/loadModels")
const assertModelAssociations = require("./modelAssociations")
const sequelizeErd = require('sequelize-erd');
const { writeFileSync } = require('fs');

loadModels()
assertModelAssociations(sequelize)

sequelize.sync({ alter: true }).then(() => {
	console.log("Synced db.");
}).catch((err) => {
	console.log("Failed to sync db: " + err.message);
});