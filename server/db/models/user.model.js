const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

const USER_TABLE = 'users';

const userSchema = {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	phone: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	country: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	city: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	isActive: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	role: {
		type: DataTypes.ENUM('user', 'admin', 'agent'),
		allowNull: false,
		defaultValue: 'user',
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW,
	},
	updatedAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW,
	},
};

class User extends Model {
	static associate(models) {}

	static config(sequelize) {
		return {
			sequelize,
			tableName: USER_TABLE,
			modelName: 'User',
			hooks: {
				beforeCreate: async (user) => {
					const hashedPassword = await bcrypt.hash(user.password, 10);
					user.password = hashedPassword;
				},
			},
		};
	}
}

module.exports = { USER_TABLE, userSchema, User };
