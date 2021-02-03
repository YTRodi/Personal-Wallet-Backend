const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const Operation = sequelize.define(
		'Operation',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			concept: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			amount: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			creation: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			type: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			underscored: true,
		}
	);

	return Operation;
};
