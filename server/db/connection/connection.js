const { setupModels } = require('../models');
const { config } = require('./config');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
	config.dbName,
	config.dbUser,
	config.dbPassword,
	{
		host: config.dbHost,
		dialect: 'postgres',
		port: config.dbPort,
	}
);

setupModels(sequelize);

module.exports = sequelize;
