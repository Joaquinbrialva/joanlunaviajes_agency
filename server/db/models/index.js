const { Request, requestSchema } = require('./request.model');
const { Trip, tripsSchema } = require('./trip.model');
const { User, userSchema } = require('./user.model');

function setupModels(sequelize) {
	// Inicializar modelos
	User.init(userSchema, User.config(sequelize));
	Trip.init(tripsSchema, Trip.config(sequelize));
	Request.init(requestSchema, Request.config(sequelize));
	
	// Establecer asociaciones
	User.associate({ User, Trip, Request });
	Trip.associate({ User, Trip, Request });
	Request.associate({ User, Trip, Request });
}

module.exports = { setupModels };
