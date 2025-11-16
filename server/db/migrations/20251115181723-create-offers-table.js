'use strict';

const { OFFER_TABLE, offerSchema } = require('../models/offer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(OFFER_TABLE, offerSchema);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable(OFFER_TABLE);
	},
};
