'use strict';

const { BENEFIT_TABLE, benefitSchema } = require('../models/benefit.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(BENEFIT_TABLE, benefitSchema);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable(BENEFIT_TABLE);
	},
};
