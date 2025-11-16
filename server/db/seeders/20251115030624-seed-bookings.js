'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert('bookings', [
			{
				id: uuidv4(),
				clientName: 'Juan Pérez',
				clientEmail: 'juan@gmail.com',
				clientPhone: '+54 9 11 5555 0000',
				offer_id: 'c50645be-0f04-4f03-9db5-d386d4e586dd',
				user_id: '6873528e-9965-43bb-b05a-116d98dbc1a1',
				message: 'Me interesa reservar para diciembre.',
				status: 'pendiente',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: uuidv4(),
				clientName: 'María Gómez',
				clientEmail: 'maria@gmail.com',
				clientPhone: '+54 9 351 444 0000',
				offer_id: '5260401a-7d64-484f-ace7-2c4228f43828',
				user_id: '6873528e-9965-43bb-b05a-116d98dbc1b1',
				message: 'Consulta por disponibilidad en enero.',
				status: 'confirmada',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('bookings', null, {});
	},
};
