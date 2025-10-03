const { DataTypes, Model } = require('sequelize');

const TRIP_TABLE = 'trips';

const tripsSchema = {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
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
	photos: {
		type: DataTypes.ARRAY(DataTypes.STRING),
		allowNull: false,
	},
	notes: {
		type: DataTypes.STRING,
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
		onDelete: 'SET NULL',
	},
};

class Trip extends Model {
	static associate(models) {
		// Un viaje pertenece a un usuario
		this.belongsTo(models.User, {
			as: 'user',
			foreignKey: 'userId'
		});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: TRIP_TABLE,
			modelName: 'Trip',
		};
	}
}

module.exports = { TRIP_TABLE, tripsSchema, Trip };
