'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert('categories', [
			{
				id: uuidv4(),
				name: 'Ofertas',
				slug: 'ofertas',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: uuidv4(),
				name: 'Destinos',
				slug: 'destinos',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('categories', null, {});
	},
};
