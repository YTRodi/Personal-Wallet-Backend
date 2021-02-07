const { response } = require('express');
const chalk = require('chalk');
const { User, Operation } = require('../database/database');
const { checkBalanceAmount } = require('../helpers/validateOperation');

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

const getOperationsByUserId = async (req, res = response) => {
	const { id } = req.params;

	try {
		const filteredResults = await Operation.findAll({
			where: { user_id: id },
			include: [{ model: User }],
		});

		if (!filteredResults) {
			return res.status(500).json({
				ok: false,
				msg: 'Please talk to the administrator.',
			});
		}

		const resultObj = filteredResults.map((operation) => {
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
	const { uid } = req;

	try {
		let operation = {
			...req.body,
			user_id: req.uid,
			creation: new Date(),
		};

		// Verify
		const user = await User.findOne({
			where: { id: uid },
		});

		const modifiedUser = checkBalanceAmount(user, operation);

		if (modifiedUser) {
			// Update user.balance
			const updatedUser = await User.update(modifiedUser, {
				where: { id: uid },
			});
			console.log(updatedUser);

			let newOperation = await Operation.create(operation);
			res.status(201).json({
				ok: true,
				newOperation,
			});
		}
	} catch (error) {
		console.log(chalk.bgRed(error));

		res.status(500).json({
			ok: false,
			msg: 'Please talk to the administrator.',
			details: error.toString(),
		});
	}
};

const updateOperation = async (req, res = response) => {
	const { id } = req.params;
	const { uid } = req;

	try {
		const operation = await Operation.findOne({
			where: { id },
		});

		if (!operation) {
			return res.status(404).json({
				ok: false,
				msg: 'There is no operation with that id',
			});
		}

		// Validate operation.user.id === req.uid
		if (operation.user_id !== uid) {
			return res.status(401).json({
				ok: false,
				msg: `User doesn't have privileges to edit this operation - Unauthorized`,
			});
		}

		// Update
		const updatedOperation = {
			...req.body,
			user_id: uid,
		};

		// I can't update the type ( business rules )
		const [result] = await Operation.update(updatedOperation, {
			where: { id },
		});

		if (result !== 0 && result) {
			res.status(200).json({
				ok: true,
				operation: updatedOperation,
			});
		}
	} catch (error) {
		console.log(chalk.bgRed(error));

		res.status(500).json({
			ok: false,
			msg: 'Please talk to the administrator.',
		});
	}
};

const deleteOperation = async (req, res = response) => {
	const { id } = req.params;
	const { uid } = req;

	try {
		const operation = await Operation.findOne({
			where: { id },
		});

		if (!operation) {
			return res.status(404).json({
				ok: false,
				msg: 'There is no operation with that id',
			});
		}

		// Validate operation.user.id === req.uid
		if (operation.user_id !== uid) {
			return res.status(401).json({
				ok: false,
				msg: `User doesn't have privileges to edit this operation - Unauthorized`,
			});
		}

		const [result] = await Operation.destroy({
			where: { id },
		});

		if (result !== 0 && result) {
			res.status(200).json({
				ok: true,
				msg: 'deleted successfully',
			});
		}
	} catch (error) {
		console.log(chalk.bgRed(error));

		res.status(500).json({
			ok: false,
			msg: 'Please talk to the administrator.',
		});
	}
};

module.exports = {
	list: getOperations,
	listByUserId: getOperationsByUserId,
	add: createOperation,
	update: updateOperation,
	del: deleteOperation,
};
