const boom = require('@hapi/boom');
const { models } = require('../db/connection/connection');
const { ERROR_MESSAGES } = require('../utils/constants');

class UserService {
	async create(data) {
		const newUser = await models.User.create(data);
		return newUser;
	}

	async findById(id) {
		const user = await models.User.findByPk(id);
		if (user === null) {
			throw boom.notFound(ERROR_MESSAGES.NOT_FOUND);
		} else {
			return user;
		}
	}

	async findByEmail(email) {
		const user = await models.User.findOne({
			where: { email: email },
		});
		if (user === null) {
			throw boom.notFound(ERROR_MESSAGES.USER_NOT_FOUND);
		} else {
			return user;
		}
	}

	async update(id, data) {
		const user = await this.findById(id);
		const updatedUser = await user.update(data);
		return updatedUser;
	}

	async delete(id) {
		const user = await this.findById(id);
		await user.destroy();
		return { id };
	}
}
module.exports = UserService;
