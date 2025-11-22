'use strict';
const ids = require('../../src/utils/seed-ids');

module.exports = {
	async up(queryInterface) {
		const bookings = [
			{
				id: ids.bookings.book1,
				clientName: 'Cliente A',
				clientEmail: 'clienteA@example.com',
				clientPhone: '5551234',
				user_id: ids.users.user4,
				offer_id: ids.offers.salta1,
				message: 'Quiero reservar para 2 personas, ¿puedo pagar señal?',
				status: 'pendiente',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: ids.bookings.book2,
				clientName: 'Cliente B',
				clientEmail: 'clienteB@example.com',
				clientPhone: '5555678',
				user_id: ids.users.user5,
				offer_id: ids.offers.miami1,
				message: '¿Hay disponibilidad para noviembre?',
				status: 'confirmada',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: ids.bookings.book3,
				clientName: 'Cliente C',
				clientEmail: 'clienteC@example.com',
				clientPhone: '5559101',
				user_id: ids.users.user6,
				offer_id: ids.offers.cancun1,
				message: 'Me interesa el paquete, ¿cómo hago para pagar?',
				status: 'pendiente',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			// Agregá más para algunas ofertas, no todas
		];

		await queryInterface.bulkInsert('bookings', bookings);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('bookings', null, {});
	},
};
