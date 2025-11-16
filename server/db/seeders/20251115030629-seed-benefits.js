'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert('benefits', [
			{
				id: uuidv4(),
				title: 'Equipaje incluido',
				description: 'Incluye carry-on y valija despachada.',
				icon: 'Luggage',
				isActive: true,
				offerId: '01a77812-e4a0-4c14-ad49-ef0651756cda',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: uuidv4(),
				title: 'Desayuno incluido',
				description: 'Buffet libre todos los días.',
				icon: 'Coffee',
				isActive: true,
				offerId: '31adacd9-4e7f-4ed0-9ee9-7f4f415ed8ee',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('benefits', null, {});
	},
};
