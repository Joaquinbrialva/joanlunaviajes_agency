'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('users', [
			{
				id: uuidv4(),
				name: 'Joaquín',
				lastName: 'Alvarez',
				email: 'joaquin@example.com',
				password:
					'$2b$12$SejctETir/PhCkod/3Qh/eVwlsslnv5kjbUaVCQnu26Mcnp4TBz8C',
				phone: '1163041071',
				country: 'Argentina',
				city: 'Buenos Aires',
				role: 'admin',
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: uuidv4(),
				name: 'María',
				lastName: 'González',
				email: 'maria@example.com',
				password:
					'$2b$12$SejctETir/PhCkod/3Qh/eVwlsslnv5kjbUaVCQnu26Mcnp4TBz8C',
				phone: '1163041072',
				country: 'Peru',
				city: 'Lima',
				role: 'user',
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('users', null, {});
	},
};
