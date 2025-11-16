'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert('offers', [
			{
				id: uuidv4(),
				title: 'Paquete a Bariloche 5 noches',
				description:
					'Incluye hotel 3*, desayuno buffet y excursión al Cerro Catedral.',
				price: 350000,
				currency: 'ARS',
				nights: 5,
				startDate: new Date('2025-01-10'),
				endDate: new Date('2025-01-15'),
				availability: 20,
				highlighted: true,
				included: [
					'Hotel 3*',
					'Desayuno',
					'Traslados',
					'Excursión Cerro Catedral',
				],
				notIncluded: ['Comidas', 'Seguro de viaje'],
				policies: 'Cancelación sin cargo hasta 15 días antes.',
				images: ['bariloche1.jpg', 'bariloche2.jpg'],

				destination_id: 'd5c44847-a642-4d0f-ab43-fd02abb5bb2a', // Bariloche
				category_id: 'db2689da-950f-4725-b34c-1f7de33c0af3', // Ofertas
				user_id: '3be4ce4d-9b9b-4ad5-8edc-7163579e8185', // Admin

				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				id: uuidv4(),
				title: 'Escapada a Salta 3 noches',
				description:
					'Hotel céntrico, desayuno, city tour y traslado al aeropuerto.',
				price: 250000,
				currency: 'ARS',
				nights: 3,
				startDate: new Date('2025-03-05'),
				endDate: new Date('2025-03-08'),
				availability: 15,
				highlighted: false,
				included: ['Hotel 3*', 'Desayuno', 'City Tour', 'Traslados'],
				notIncluded: ['Comidas', 'Excursiones opcionales'],
				policies: 'No reembolsable dentro de los 7 días previos.',
				images: ['salta1.jpg', 'salta2.jpg'],

				destination_id: '4a3cec40-aba4-4a3e-a163-cae27299dd01', // Salta
				category_id: '07d29416-4f5b-4295-afab-ee0ffd1075b2', // Destinos
				user_id: '6873528e-9965-43bb-b05a-116d98dbc1a5', // Agent

				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('offers', null, {});
	},
};
