/*
    Routes Users / Auth:
    host + /api/operations
*/
const express = require('express');
const router = express.Router();
const { list, getById, add, update, del } = require('../controllers/operations');

router.get('/', list);

router.get('/:id', getById);

router.post('/', add);

router.put('/:id', update);

router.delete('/:id', del);

module.exports = router;
