require('dotenv').config(); // Llama a dotenv solo aquí

const config = {
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	dialect: 'postgres',
	port: parseInt(process.env.DB_PORT, 10),
	jwt_secret: process.env.JWT_SECRET,
};

module.exports = { config };
