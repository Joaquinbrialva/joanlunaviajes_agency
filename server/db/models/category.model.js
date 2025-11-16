const { Model, DataTypes } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const categorySchema = {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
	},
	name: {
		type: DataTypes.STRING(50),
		allowNull: false,
	},
	slug: {
		type: DataTypes.STRING(50),
		allowNull: false,
		unique: true,
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

class Category extends Model {
	static associate(models) {
		this.hasMany(models.Offer, {
			as: 'offers',
			foreignKey: 'categoryId',
		});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: CATEGORY_TABLE,
			modelName: 'Category',
			timestamps: false,
		};
	}
}

module.exports = { CATEGORY_TABLE, categorySchema, Category };
