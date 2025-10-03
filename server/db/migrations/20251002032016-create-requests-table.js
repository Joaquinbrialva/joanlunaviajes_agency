'use strict';

const { REQUEST_TABLE, requestSchema } = require('../models/request.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		await queryInterface.createTable(REQUEST_TABLE, requestSchema);
	},

	async down(queryInterface) {
		await queryInterface.dropTable(REQUEST_TABLE);
	},
};
