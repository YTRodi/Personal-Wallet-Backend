const { Sequelize } = require('sequelize');
const { databaseCredentials } = require('./config');
const chalk = require('chalk');

const sequelizeInstance = new Sequelize(process.env.CONNECTION_URI);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelizeInstance;

// Models/tables
db.User = require('../models/User')(sequelizeInstance);
db.Operation = require('../models/Operation')(sequelizeInstance);

// Relations
db.Operation.belongsTo(db.User);
db.User.hasMany(db.Operation);

// Connect DB
(async () => {
	try {
		await sequelizeInstance.sync({ force: false });
		console.log(chalk.magenta('DB Connected successfully !'));
	} catch (error) {
		console.log(chalk.red(`Error connecting to database.`));
		console.log(chalk.yellow(error));
	}
})();

module.exports = db;
