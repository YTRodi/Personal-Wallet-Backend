const { response } = require('express');

// The model Operation doesn't exist... yet...

// const {
// 	models: { Operation },
// } = require('../database/database');

const getOperations = (req, res = response) => {
	res.json({
		msg: 'List',
	});
};

const getOperationById = (req, res = response) => {
	res.json({
		msg: 'get operation by id',
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
	getById: getOperationById,
	add: createOperation,
	update: updateOperation,
	del: deleteOperation,
};
