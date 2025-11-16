'use strict';

const { BOOKING_TABLE, bookingSchema } = require('../models/booking.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(BOOKING_TABLE, bookingSchema);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable(BOOKING_TABLE);
	},
};
