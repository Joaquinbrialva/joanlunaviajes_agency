'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert('destinations', [
			{
				id: uuidv4(),
				name: 'Bariloche',
				country: 'Argentina',
				description: 'Un destino lleno de lagos, montañas y naturaleza.',
				image: 'bariloche.jpg',
				user_id: '3be4ce4d-9b9b-4ad5-8edc-7163579e8185', // Admin
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: uuidv4(),
				name: 'Salta',
				country: 'Argentina',
				description: 'La linda, cultura y paisajes increíbles.',
				image: 'salta.jpg',
				user_id: '6873528e-9965-43bb-b05a-116d98dbc1a5', // Agent
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('destinations', null, {});
	},
};
