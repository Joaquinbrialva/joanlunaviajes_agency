'use strict';
const ids = require('../../src/utils/seed-ids');

module.exports = {
	async up(queryInterface) {
		const reviews = [
			{
				id: ids.reviews.rev1,
				name: 'Usuario1',
				comment: 'Excelente paquete, todo bien organizado.',
				rating: 5,
				image: null,
				offer_id: ids.offers.salta1,
				user_id: ids.users.user1,
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: ids.reviews.rev2,
				name: 'Usuario2',
				comment: 'Me gustó mucho, aunque faltó más variedad de comidas.',
				rating: 4,
				image: null,
				offer_id: ids.offers.miami1,
				user_id: ids.users.user2,
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: ids.reviews.rev3,
				name: 'Usuario3',
				comment:
					'Muy buena experiencia, pero no reembolsaron parte cuando cancelé.',
				rating: 3,
				image: null,
				offer_id: ids.offers.cancun1,
				user_id: ids.users.user3,
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			// Podés generar más reviews para otras ofertas
		];

		await queryInterface.bulkInsert('reviews', reviews);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('reviews', null, {});
	},
};
