const { models } = require('../../db/connection/connection');
const boom = require('@hapi/boom');
const { ERROR_MESSAGES } = require('../utils/messages');

class CategoryService {
	async create(data) {
		const category = await models.Category.create(data);
		return category;
	}

	async findAll() {
		const categories = await models.Category.findAll({
			order: [['name', 'ASC']],
		});
		return categories;
	}

	async findById(id) {
		const category = await models.Category.findByPk(id);
		if (!category) throw boom.notFound(ERROR_MESSAGES.RESOURCE_NOT_FOUND);
		return category;
	}

	async update(id, changes) {
		const category = await this.findById(id);
		const updated = await category.update(changes);
		return updated;
	}

	async delete(id) {
		const category = await this.findById(id);
		// Optionally check relations before deleting (offers)
		await category.destroy();
		return { id };
	}
}

module.exports = CategoryService;
