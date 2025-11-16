'use strict';

const {
	DESTINATION_TABLE,
	destinationSchema,
} = require('../models/destination.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(DESTINATION_TABLE, destinationSchema);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable(DESTINATION_TABLE);
	},
};
