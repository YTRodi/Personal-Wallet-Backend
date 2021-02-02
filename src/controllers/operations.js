const { response } = require('express');
const chalk = require('chalk');
const { User, Operation } = require('../database/database');

const getOperations = async (req, res = response) => {
	try {
		// Match table operations with users
		const results = await Operation.findAll({
			include: [{ model: User }],
		});

		const resultObj = results.map((operation) => {
			const { User } = operation;

			return {
				id: operation.id,
				concept: operation.concept,
				amount: operation.amount,
				creation: operation.creation,
				type: operation.type,
				user: {
					id: User.id,
					name: User.name,
				},
			};
		});

		res.status(200).json({
			ok: true,
			operations: resultObj,
		});
	} catch (error) {
		console.log(chalk.bgRed(error));

		res.status(500).json({
			ok: false,
			msg: 'Please talk to the administrator.',
		});
	}
};

const createOperation = async (req, res = response) => {
	try {
		let operation = {
			...req.body,
			user_id: req.uid,
			creation: new Date(),
		};

		let newOperation = await Operation.create(operation);

		res.status(201).json({
			ok: true,
			newOperation,
		});
	} catch (error) {
		console.log(chalk.bgRed(error));

		res.status(500).json({
			ok: false,
			msg: 'Please talk to the administrator.',
		});
	}
};

const updateOperation = (req, res = response) => {
	res.json({
		msg: 'update operation',
	});
};

const deleteOperation = (req, res = response) => {
	res.json({
		msg: 'delete operation',
	});
};

module.exports = {
	list: getOperations,
	add: createOperation,
	update: updateOperation,
	del: deleteOperation,
};
