const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	return sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING(40),
			allowNull: false,
			validate: {
				len: [4, 20],
			},
		},
		email: {
			type: DataTypes.STRING(40),
			allowNull: false,
			validate: {
				isEmail: true,
			},
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		balance: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});
};
