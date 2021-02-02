const { response } = require('express');
const { Operation } = require('../database/database');

const getOperations = (req, res = response) => {
	res.json({
		msg: 'List',
	});
};

const createOperation = (req, res = response) => {
	res.json({
		msg: 'create operation',
	});
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
