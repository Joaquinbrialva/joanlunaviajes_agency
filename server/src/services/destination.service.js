const { models } = require('../../db/connection/connection');
const boom = require('@hapi/boom');
const { ERROR_MESSAGES } = require('../utils/messages');

class DestinationService {
	async create(data) {
		return await models.Destination.create(data);
	}

	async findAll() {
		return await models.Destination.findAll({ include: ['offers'] });
	}

	async findById(id) {
		const destination = await models.Destination.findByPk(id, {
			include: ['offers'],
		});
		if (!destination) throw boom.notFound(ERROR_MESSAGES.RESOURCE_NOT_FOUND);
		return destination;
	}

	async update(id, data) {
		const destination = await this.findById(id);
		return await destination.update(data);
	}

	async delete(id) {
		const destination = await this.findById(id);
		await destination.destroy();
		return { id };
	}
}

module.exports = DestinationService;
