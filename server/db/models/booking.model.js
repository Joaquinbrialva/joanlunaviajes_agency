const { Model, DataTypes } = require('sequelize');

const BOOKING_TABLE = 'bookings';

const bookingSchema = {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	clientName: {
		type: DataTypes.STRING,
		allowNull: false,
	}, // "Juan Pérez"
	clientEmail: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	clientPhone: {
		type: DataTypes.STRING,
		allowNull: false,
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
	offerId: {
		type: DataTypes.UUID,
		allowNull: false,
		field: 'offer_id',
		references: {
			model: 'offers',
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	},
	message: {
		type: DataTypes.TEXT,
		allowNull: true,
	}, // comentario del cliente
	status: {
		type: DataTypes.STRING,
		allowNull: false,
	}, // "pendiente" | "confirmada" | "cancelada"
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

class Booking extends Model {
	static associate(models) {
		this.belongsTo(models.Offer, {
			as: 'offer',
			foreignKey: 'offerId',
		});
	}
	static config(sequelize) {
		return {
			sequelize,
			tableName: BOOKING_TABLE,
			modelName: 'Booking',
		};
	}
}

module.exports = { Booking, bookingSchema, BOOKING_TABLE };
