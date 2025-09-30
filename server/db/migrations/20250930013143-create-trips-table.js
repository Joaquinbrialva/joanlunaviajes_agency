'use strict';

const { TRIP_TABLE, tripsSchema } = require('../models/trip.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		await queryInterface.createTable(TRIP_TABLE, tripsSchema);
	},

	async down(queryInterface) {
		await queryInterface.dropTable(TRIP_TABLE);
	},
};
