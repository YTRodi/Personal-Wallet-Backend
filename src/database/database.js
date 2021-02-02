const { Sequelize } = require('sequelize');
const { databaseCredentials } = require('./config');
const chalk = require('chalk');
const userModel = require('../models/User');

const sequelizeInstance = new Sequelize(
	databaseCredentials.database,
	databaseCredentials.user,
	databaseCredentials.password,
	{
		host: databaseCredentials.host,
		dialect: 'mysql',
	}
);

const User = userModel(sequelizeInstance);

const connectDB = async () => {
	try {
		await sequelizeInstance.sync({ force: false });
		console.log(chalk.magenta('DB Connected successfully !'));
	} catch (error) {
		console.log(chalk.red(`Error connecting to database.`));
		console.log(chalk.yellow(error));
	}
};

module.exports = {
	connectDB,
	models: {
		User,
	},
};
