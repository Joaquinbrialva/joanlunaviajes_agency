'use strict';

const { REVIEW_TABLE, reviewSchema } = require('../models/review.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(REVIEW_TABLE, reviewSchema);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable(REVIEW_TABLE);
	},
};
