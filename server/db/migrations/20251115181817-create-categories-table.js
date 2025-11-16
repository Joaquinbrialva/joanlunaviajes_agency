'use strict';

const { CATEGORY_TABLE, categorySchema } = require('../models/category.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(CATEGORY_TABLE, categorySchema);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable(CATEGORY_TABLE);
	},
};
