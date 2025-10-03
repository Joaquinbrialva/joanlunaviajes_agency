const { Model, DataTypes } = require('sequelize');

const REQUEST_TABLE = 'requests';

const requestSchema = {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	origin: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	destination: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	departureDate: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	returnDate: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	isRoundTrip: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false
	},
	passengers: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	notes: {
		type: DataTypes.TEXT,
		allowNull: true,
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
	userId: {
		type: DataTypes.UUID,
		allowNull: false,
		field: 'user_id',
		references: {
			model: 'users',
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	},
};

class Request extends Model {
	static associate(models) {
		// Una solicitud pertenece a un usuario
		this.belongsTo(models.User, {
			as: 'user',
			foreignKey: 'userId'
		});
	}
	static config(sequelize) {
		return {
			sequelize,
			tableName: REQUEST_TABLE,
			modelName: 'Request',
		};
	}
}

module.exports = { Request, requestSchema, REQUEST_TABLE };
