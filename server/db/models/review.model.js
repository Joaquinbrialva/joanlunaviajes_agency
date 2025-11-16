const { Model, DataTypes } = require('sequelize');

const REVIEW_TABLE = 'reviews';

const reviewSchema = {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	}, // "María López"
	comment: {
		type: DataTypes.TEXT,
		allowNull: false,
	}, // "Excelente atención..."
	rating: {
		type: DataTypes.INTEGER,
		allowNull: false,
	}, // 1 a 5
	image: {
		type: DataTypes.STRING,
		allowNull: true,
	}, // foto del cliente (opcional)
	offerId: {
		type: DataTypes.UUID,
		allowNull: true,
		field: 'offer_id',
		references: {
			model: 'offers',
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	}, // si aplica a un viaje en particular
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
	isActive: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	}, // para moderación de reseñas
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

class Review extends Model {
	static associate(models) {
		this.belongsTo(models.Offer, {
			as: 'offer',
			foreignKey: 'offerId',
		});
	}
	static config(sequelize) {
		return {
			sequelize,
			tableName: REVIEW_TABLE,
			modelName: 'Review',
		};
	}
}

module.exports = { Review, reviewSchema, REVIEW_TABLE };
