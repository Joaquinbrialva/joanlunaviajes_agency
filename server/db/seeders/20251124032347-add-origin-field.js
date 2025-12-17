'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		// Lista global de ciudades reales
		const origins = [
			'Buenos Aires (EZE)',
			'Córdoba (COR)',
			'Rosario (ROS)',
			'Mendoza (MDZ)',
			'Santiago de Chile (SCL)',
			'Lima (LIM)',
			'Miami (MIA)',
			'New York (JFK)',
			'Los Ángeles (LAX)',
			'Madrid (MAD)',
			'Barcelona (BCN)',
			'Roma (FCO)',
			'París (CDG)',
			'Londres (LHR)',
			'Frankfurt (FRA)',
			'Dubái (DXB)',
			'Tokio (NRT)',
			'Sídney (SYD)',
			'Toronto (YYZ)',
			'Ciudad de México (MEX)',
		];

		// Obtener todas las ofertas
		const [offers] = await queryInterface.sequelize.query(`
      SELECT id FROM offers;
    `);

		// Actualizar cada oferta con un origen aleatorio
		for (const offer of offers) {
			const randomOrigin = origins[Math.floor(Math.random() * origins.length)];

			await queryInterface.bulkUpdate(
				'offers',
				{ origin: randomOrigin },
				{ id: offer.id }
			);
		}
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkUpdate('offers', { origin: null }, {});
	},
};
