const { Model, DataTypes } = require('sequelize');

const DESTINATION_TABLE = 'destinations';

const destinationSchema = {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	}, // "Río de Janeiro"
	country: {
		type: DataTypes.STRING,
		allowNull: false,
	}, // "Brasil"
	image: {
		type: DataTypes.STRING,
		allowNull: true,
	}, // Imagen destacada
	description: {
		type: DataTypes.STRING,
		allowNull: true,
	}, // Info turística breve
	popularity: {
		type: DataTypes.INTEGER,
		allowNull: true,
	}, // Ranking interno o visitas
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

class Destination extends Model {
	static associate(models) {
		this.hasMany(models.Offer, {
			as: 'offers',
			foreignKey: 'destinationId',
		});
	}
	static config(sequelize) {
		return {
			sequelize,
			tableName: DESTINATION_TABLE,
			modelName: 'Destination',
		};
	}
}

module.exports = { Destination, destinationSchema, DESTINATION_TABLE };
