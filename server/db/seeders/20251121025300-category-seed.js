'use strict';
const ids = require('../../src/utils/seed-ids');

module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert('categories', [
			{
				id: ids.categories.destinos,
				name: 'Destinos',
				slug: 'destinos',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: ids.categories.ofertas,
				name: 'Ofertas',
				slug: 'ofertas',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: ids.categories.internacionales,
				name: 'Internacionales',
				slug: 'internacionales',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: ids.categories.nacionales,
				name: 'Nacionales',
				slug: 'nacionales',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	async down(queryInterface) {
		await queryInterface.bulkDelete('categories', null, {});
	},
};
