'use strict';
const ids = require('../../src/utils/seed-ids');

module.exports = {
	async up(queryInterface) {
		const benefits = [
			{
				id: ids.benefits.ben1,
				title: 'Desayuno incluido',
				description: 'Desayuno diario en hotel',
				icon: 'Breakfast',
				offerId: ids.offers.salta1,
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: ids.benefits.ben2,
				title: 'Traslados aeropuerto',
				description: 'Traslado desde y hacia el aeropuerto',
				icon: 'Airport',
				offerId: ids.offers.miami1,
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: ids.benefits.ben3,
				title: 'Tour nocturno',
				description: 'Recorrido por la ciudad con guía',
				icon: 'CityTour',
				offerId: ids.offers.paris1,
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			// + más para otras ofertas
		];
		await queryInterface.bulkInsert('benefits', benefits);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('benefits', null, {});
	},
};
