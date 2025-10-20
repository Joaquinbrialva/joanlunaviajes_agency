// __tests__/auth.test.js

// Importaciones necesarias:
const UserService = require('../services/user.service');
const service = new UserService();
const bcrypt = require('bcrypt'); // Necesario para mockear la comparación de passwords
const boom = require('@hapi/boom'); // Necesario para verificar los errores Boom
const { AUTH_MESSAGES } = require('../utils/messages'); // Mensajes de error de tu código

// Datos simulados para las pruebas
const MOCKED_USER = {
	id: 1,
	email: 'test@example.com',
	password: 'hashed_password_real', // La DB devuelve el hash
	role: 'user',
	// Simulación del .toJSON() que usa tu función logIn
	toJSON: () => ({
		id: 1,
		email: 'test@example.com',
		role: 'user',
		// Aquí irían otros campos excluidos como name, lastName, etc.
	}),
};

const MOCKED_NEW_USER = {
	id: 2,
	email: 'newuser@example.com',
	name: 'Nuevo',
	toJSON: () => ({
		id: 2,
		email: 'newuser@example.com',
		name: 'Nuevo',
	}),
};

const MOCKED_PASS = 'validpassword';

describe('UserService - Authentication (Login & Signup)', () => {
	// Limpieza: Restaura todos los mocks después de cada prueba
	afterEach(() => {
		jest.restoreAllMocks();
	});

	// =========================================================================
	// PRUEBAS PARA logIn(data)
	// =========================================================================

	describe('logIn(data)', () => {
		test('1. Debería autenticar y devolver el usuario y el token (200 OK)', async () => {
			// ARRANGE
			const validData = { email: MOCKED_USER.email, password: MOCKED_PASS };

			// MOCK 1: Simular que la DB encuentra al usuario
			jest
				.spyOn(service, 'findByEmailWithPassword')
				.mockResolvedValue(MOCKED_USER);

			// MOCK 2: Simular que el password COINCIDE (bcrypt.compare devuelve true)
			jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

			// MOCK 3: Simular la creación del token (para aislar jwt.sign)
			jest.spyOn(service, 'signToken').mockResolvedValue('fake.jwt.token');

			// ACT
			const result = await service.logIn(validData);

			// ASSERT
			expect(result).toHaveProperty('user');
			expect(result).toHaveProperty('token', 'fake.jwt.token');
			expect(result.user.email).toBe(validData.email);
			expect(result.user).not.toHaveProperty('password');
		});

		test('2. Debería lanzar error 401 si el password es incorrecto', async () => {
			// ARRANGE
			const invalidData = {
				email: MOCKED_USER.email,
				password: 'wrong_password',
			};

			// MOCK 1: Simular que la DB encuentra al usuario
			jest
				.spyOn(service, 'findByEmailWithPassword')
				.mockResolvedValue(MOCKED_USER);

			// MOCK 2: Simular que el password NO COINCIDE (bcrypt.compare devuelve false)
			jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

			// ACT & ASSERT: Esperamos que la función sea rechazada con el mensaje de error
			await expect(service.logIn(invalidData)).rejects.toThrow(
				AUTH_MESSAGES.INVALID_CREDENTIALS
			); // Verificamos que lance el error de Boom

			expect(service.findByEmailWithPassword).toHaveBeenCalledTimes(1);
		});

		test('3. Debería lanzar error 401 si el usuario no existe', async () => {
			// ARRANGE
			const nonExistentData = {
				email: 'nonexistent@example.com',
				password: MOCKED_PASS,
			};

			// MOCK: Simular que la DB devuelve null (usuario no encontrado)
			jest.spyOn(service, 'findByEmailWithPassword').mockResolvedValue(null);

			// ACT & ASSERT
			await expect(service.logIn(nonExistentData)).rejects.toThrow(
				AUTH_MESSAGES.INVALID_CREDENTIALS
			);

			expect(service.findByEmailWithPassword).toHaveBeenCalledTimes(1);

			// Opcional: Aseguramos que bcrypt.compare NO fue llamado, ya que el 'if (!user)' lo evita
			expect(bcrypt.compare).not.toHaveBeenCalled();
		});
	});

	// =========================================================================
	// PRUEBAS PARA create(data)
	// =========================================================================

	describe('create(data)', () => {
		test('4. Debería crear un nuevo usuario si el email no existe (201 Created)', async () => {
			// ARRANGE
			const newUserData = {
				email: MOCKED_NEW_USER.email,
				password: MOCKED_PASS,
				name: 'Nuevo',
			};

			// MOCK 1: Simular que el email NO está registrado (findByEmail devuelve null)
			jest.spyOn(service, 'findByEmail').mockResolvedValue(null);

			// MOCK 2: Simular la creación en la DB (models.User.create)
			// Nota: Accedemos directamente a models.User, que debe ser mockeado
			jest
				.spyOn(require('../../db/connection/connection').models.User, 'create')
				.mockResolvedValue(MOCKED_NEW_USER);

			// ACT
			const result = await service.create(newUserData);

			// ASSERT
			expect(service.findByEmail).toHaveBeenCalledWith(newUserData.email);
			expect(result.email).toBe(newUserData.email);
			expect(result.name).toBe(newUserData.name);
			expect(
				require('../../db/connection/connection').models.User.create
			).toHaveBeenCalledTimes(1);
		});

		test('5. Debería lanzar error 400 si el email ya existe', async () => {
			// ARRANGE
			const existingUserData = {
				email: MOCKED_USER.email,
				password: MOCKED_PASS,
			};

			// MOCK: Simular que findByEmail ENCUENTRA el usuario (ya existe)
			jest.spyOn(service, 'findByEmail').mockResolvedValue(MOCKED_USER);

			// ACT & ASSERT
			await expect(service.create(existingUserData)).rejects.toThrow(
				AUTH_MESSAGES.EMAIL_ALREADY_EXISTS
			); // Verificamos el mensaje específico

			expect(
				require('../../db/connection/connection').models.User.create
			).not.toHaveBeenCalled(); // No debe intentar crear
		});

		test('6. Debería lanzar error 400 si faltan campos obligatorios', async () => {
			// ARRANGE (No es necesario mockear si la validación ocurre antes en la ruta)
			// Sin embargo, podemos simular un error de validación de Sequelize o el ORM
			const incompleteData = { email: 'incomplete@test.com' }; // Falta password, name, etc.

			// Simular que findByEmail pasa, y el error ocurre en la creación.
			jest.spyOn(service, 'findByEmail').mockResolvedValue(null);

			// MOCK: Simular que models.User.create lanza un error de validación (400)
			jest
				.spyOn(require('../../db/connection/connection').models.User, 'create')
				.mockRejectedValue(
					boom.badRequest('Validation error: password is required')
				);

			// ACT & ASSERT
			await expect(service.create(incompleteData)).rejects.toThrow(
				'Validation error: password is required'
			);

			expect(service.findByEmail).toHaveBeenCalledTimes(1);
		});
	});
});
