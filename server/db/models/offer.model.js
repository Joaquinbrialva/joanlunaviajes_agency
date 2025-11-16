const { Model, DataTypes } = require('sequelize');

const OFFER_TABLE = 'offers';

const offerSchema = {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING(500),
		allowNull: true,
	},
	price: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	currency: {
		type: DataTypes.STRING(10),
		allowNull: false,
		defaultValue: 'USD',
	},
	nights: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	startDate: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	endDate: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	availability: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	highlighted: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	included: {
		type: DataTypes.ARRAY(DataTypes.STRING),
		allowNull: true,
	},
	notIncluded: {
		type: DataTypes.ARRAY(DataTypes.STRING),
		allowNull: true,
	},
	policies: {
		type: DataTypes.STRING(500),
		allowNull: true,
	},
	images: {
		type: DataTypes.ARRAY(DataTypes.TEXT),
		allowNull: true,
		defaultValue: [],
	},
	status: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
	destinationId: {
		type: DataTypes.UUID,
		allowNull: false,
		field: 'destination_id',
	},
	categoryId: {
		type: DataTypes.UUID,
		allowNull: false,
		field: 'category_id',
	},
	userId: {
		type: DataTypes.UUID,
		allowNull: false,
		field: 'user_id',
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
	updatedAt: {
		allowNull: false,
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
};

class Offer extends Model {
	static associate(models) {
		this.belongsTo(models.Destination, {
			as: 'destination',
			foreignKey: 'destinationId',
		});

		this.belongsTo(models.Category, {
			as: 'category',
			foreignKey: 'categoryId',
		});

		this.belongsTo(models.User, {
			as: 'user',
			foreignKey: 'userId',
		});

		this.hasMany(models.Booking, {
			as: 'bookings',
			foreignKey: 'offerId',
		});

		this.hasMany(models.Review, {
			as: 'reviews',
			foreignKey: 'offerId',
		});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: OFFER_TABLE,
			modelName: 'Offer',
			timestamps: true,
		};
	}
}

module.exports = { OFFER_TABLE, offerSchema, Offer };
