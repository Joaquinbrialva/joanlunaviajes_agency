require('dotenv').config();

const config = {
	dbName: process.env.DB_NAME,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbHost: process.env.DB_HOST,
	dbPort: process.env.DB_PORT,
	isProd: process.env.NODE_ENV === 'production',
};

module.exports = { config };
