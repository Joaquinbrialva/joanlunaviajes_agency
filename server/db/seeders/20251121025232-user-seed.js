'use strict';
const ids = require('../../src/utils/seed-ids');

module.exports = {
	async up(queryInterface) {
		const users = [
			// Admin
			{
				id: ids.users.admin,
				name: 'Joaquín',
				lastName: 'Alvarez',
				email: 'admin@viajes.com',
				password: '...hashed...',
				phone: '1111111111',
				country: 'Argentina',
				city: 'Buenos Aires',
				role: 'admin',
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			// Agents
			{
				id: ids.users.agent1,
				name: 'Agente',
				lastName: 'Uno',
				email: 'agent1@viajes.com',
				password: '...hashed...',
				phone: '2222222222',
				country: 'Argentina',
				city: 'Buenos Aires',
				role: 'agent',
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: ids.users.agent2,
				name: 'Agente',
				lastName: 'Dos',
				email: 'agent2@viajes.com',
				password: '...hashed...',
				phone: '3333333333',
				country: 'Argentina',
				city: 'Córdoba',
				role: 'agent',
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		];

		// clientes
		for (let i = 1; i <= 15; i++) {
			const key = `user${i}`;
			users.push({
				id: ids.users[key],
				name: `Usuario${i}`,
				lastName: `Apellido${i}`,
				email: `user${i}@viajes.com`,
				password: '...hashed...',
				phone: `40000000${i}`,
				country: i % 2 === 0 ? 'Argentina' : 'España',
				city: i % 2 === 0 ? 'Buenos Aires' : 'Madrid',
				role: 'user',
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		await queryInterface.bulkInsert('users', users);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('users', null, {});
	},
};
