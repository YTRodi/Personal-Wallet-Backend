const databaseCredentials = {
	host: process.env.HOST || 'localhost',
	user: process.env.USER || 'root',
	password: process.env.PASSWORD || 'Maggieestaloca2021',
	database: process.env.DATABASE_NAME || 'pruebas',
};

module.exports = {
	databaseCredentials,
};
