const boom = require('@hapi/boom');
const { models } = require('../../db/connection/connection');
const { ERROR_MESSAGES } = require('../utils/messages');

class UserService {
	async signToken({ id, role }) {
		const secret = process.env.JWT_SECRET;
		const token = jwt.sign({ sub: id, role }, secret, {
			expiresIn: '15m',
		});
		return token;
	}

	async logIn(data) {
		const user = await this.findByEmail(data.email);
		if (!user || !(await bcrypt.compare(data.password, user.password))) {
			throw boom.unauthorized(ERROR_MESSAGES.DATA_VALIDATION_FAILED);
		}

		const userWithoutPassword = user.toJSON();
		delete userWithoutPassword.password; // Aquí pasamos el id y el role del usuario al signToken

		const token = await this.signToken({ id: user.id, role: user.role });

		return { user: userWithoutPassword, token };
	}

	async create(data) {
		const user = await this.findByEmail(data.email);
		if (user) {
			throw boom.badRequest(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
		}
		const newUser = await models.User.create(data);
		return newUser;
	}

	async findById(id) {
		const user = await models.User.findByPk(id);
		if (user === null) {
			throw boom.notFound(ERROR_MESSAGES.RESOURCE_NOT_FOUND);
		} else {
			return user;
		}
	}

	async findByEmail(email) {
		const user = await models.User.findOne({
			where: { email },
		});
		if (user === null) {
			return null;
		}
		return user;
	}

	async findAll() {
		const users = await models.User.findAll();
		return users;
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
