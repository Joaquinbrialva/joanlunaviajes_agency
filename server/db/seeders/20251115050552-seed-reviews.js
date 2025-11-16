'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert('reviews', [
			{
				id: uuidv4(),
				name: 'María López',
				comment:
					'La atención fue excelente, me acompañaron en todo el proceso. Súper recomendable.',
				rating: 5,
				image: 'maria.jpg',
				offer_id: '5260401a-7d64-484f-ace7-2c4228f43828', // <-- reemplazar si es necesario
				user_id: '6873528e-9965-43bb-b05a-116d98dbc1a1',
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: uuidv4(),
				name: 'Carlos Díaz',
				comment:
					'Muy buena experiencia, el hotel estaba impecable y todo salió como lo prometieron.',
				rating: 4,
				image: null,
				offer_id: '5260401a-7d64-484f-ace7-2c4228f43828', // <-- reemplazar si no existe
				user_id: '6873528e-9965-43bb-b05a-116d98dbc1a1', // <-- CORREGIDO (no puede ser true)
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: uuidv4(),
				name: 'Florencia Romero',
				comment:
					'El viaje a Salta estuvo hermoso. Perfecta organización y buen precio.',
				rating: 5,
				image: 'florencia.png',
				offer_id: 'c50645be-0f04-4f03-9db5-d386d4e586dd',
				user_id: '6873528e-9965-43bb-b05a-116d98dbc1b1',
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: uuidv4(),
				name: 'Julián Torres',
				comment:
					'Buena experiencia general, aunque tardaron un poco en responder consultas.',
				rating: 3,
				image: null,
				offer_id: 'c50645be-0f04-4f03-9db5-d386d4e586dd',
				user_id: '3be4ce4d-9b9b-4ad5-8edc-7163579e8185',
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('reviews', null, {});
	},
};
