const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const User = sequelize.define(
		'User',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING(40),
				allowNull: false,
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
		},
		{
			underscored: true,
		}
	);

	return User;
};
