'use strict';

const { OFFER_TABLE } = require('../models/offer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn(OFFER_TABLE, 'status', {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn(OFFER_TABLE, 'status');
	},
};
