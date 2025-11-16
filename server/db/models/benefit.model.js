const { DataTypes, Model } = require('sequelize');

const BENEFIT_TABLE = 'benefits';

const benefitSchema = {
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
	description: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	icon: {
		type: DataTypes.STRING,
		allowNull: true, // nombre del ícono, ej: "Plane", "Headphones"
	},
	offerId: {
		type: DataTypes.UUID,
		allowNull: true,
		references: {
			model: 'offers',
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
	isActive: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
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

class Benefit extends Model {
	static associate(models) {
		// Si algún día querés asociar con otra entidad (ej. categoría o usuario creador)
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: BENEFIT_TABLE,
			modelName: 'Benefit',
			timestamps: true,
		};
	}
}

module.exports = { BENEFIT_TABLE, benefitSchema, Benefit };
