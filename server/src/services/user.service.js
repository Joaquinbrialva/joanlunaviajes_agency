const { config } = require('../../config/config');
const boom = require('@hapi/boom');
const { models } = require('../../db/connection/connection');
const { ERROR_MESSAGES, AUTH_MESSAGES } = require('../utils/messages');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Constantes para roles
const ROLES = {
	ADMIN: 'admin',
	AGENT: 'agent',
	USER: 'user',
};

class UserService {
	// Configuración común para excluir password
	static getDefaultAttributes() {
		return {
			exclude: ['password'],
		};
	}

	// Método privado para verificar autorización
	#checkAuthorization(user, targetUserId) {
		const isOverrideRole =
			user.role === ROLES.ADMIN || user.role === ROLES.AGENT;
		const isOwner = user.sub === targetUserId;
		return isOverrideRole || isOwner;
	}

	async signToken({ id, role }) {
		const secret = config.jwt_secret;
		const token = jwt.sign({ sub: id, role }, secret, {
			expiresIn: '1h',
		});
		return token;
	}

	async logIn(data) {
		const user = await this.findByEmailWithPassword(data.email);
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
			throw boom.badRequest(AUTH_MESSAGES.EMAIL_ALREADY_EXISTS);
		}
		const newUser = await models.User.create(data);
		return newUser;
	}

	async findById(id, includePassword = false) {
		const attributes = includePassword
			? {}
			: UserService.getDefaultAttributes();

		const user = await models.User.findByPk(id, { attributes });

		if (user === null) {
			throw boom.notFound(ERROR_MESSAGES.USER_NOT_FOUND);
		}

		return user;
	}

	async findByEmail(email, includePassword = false) {
		const attributes = includePassword
			? {}
			: UserService.getDefaultAttributes();

		const user = await models.User.findOne({
			where: { email },
			attributes,
		});

		return user;
	}

	// Método especial para autenticación que incluye el password
	async findByEmailWithPassword(email) {
		return this.findByEmail(email, true);
	}

	async findAll(options = {}) {
		const { page = 1, limit = 10 } = options;

		const queryOptions = {
			attributes: UserService.getDefaultAttributes(),
			limit: parseInt(limit),
			offset: (parseInt(page) - 1) * parseInt(limit),
		};

		const { count, rows } = await models.User.findAndCountAll(queryOptions);

		// Calcular metadatos de paginación
		const totalPages = Math.ceil(count / parseInt(limit));
		const currentPage = parseInt(page);

		// Si la página solicitada no existe, redirigir automáticamente a página 1
		if (currentPage > totalPages && totalPages > 0) {
			// Crear nuevas opciones con página 1
			const correctedOptions = { ...options, page: 1 };
			const correctedResult = await this.findAll(correctedOptions);

			// Agregar metadatos de redirección para transparencia
			return {
				...correctedResult,
				requestedPage: currentPage, // Página que pidió originalmente
				correctedToPage: 1, // Página a la que se redirigió
				wasRedirected: true, // Flag para indicar redirección
			};
		}

		return {
			data: rows,
			total: count,
			page: currentPage,
			limit: parseInt(limit),
			totalPages,
		};
	}

	async update(id, data, user = null) {
		const targetUser = await this.findById(id);

		// Si se proporciona un usuario, verificar autorización
		if (user && !this.#checkAuthorization(user, id)) {
			throw boom.forbidden(AUTH_MESSAGES.FORBIDDEN);
		}

		const updatedUser = await targetUser.update(data);
		return updatedUser;
	}

	async delete(id, user = null) {
		const targetUser = await this.findById(id);

		// Si se proporciona un usuario, verificar autorización
		if (user && !this.#checkAuthorization(user, id)) {
			throw boom.forbidden(AUTH_MESSAGES.FORBIDDEN);
		}

		await targetUser.destroy();
		return { id };
	}
}
module.exports = UserService;
