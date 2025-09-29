const { Request, requestSchema } = require('./request.model');
const { Trip, tripsSchema } = require('./trip.model');
const { User, userSchema } = require('./user.model');

function setupModels(sequelize) {
	User.init(userSchema, User.config(sequelize));
	Trip.init(tripsSchema, Trip.config(sequelize));
	Request.init(requestSchema, Request.config(sequelize));
}

module.exports = { setupModels };
