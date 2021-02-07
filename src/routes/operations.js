/*
    Routes Users / Auth:
    host + /api/operations
*/
const express = require('express');
const router = express.Router();
const { list, listByUserId, add, update, del } = require('../controllers/operations');
const { validateJWT } = require('../middlewares/validateJWT');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fieldsValidator');

router.use(validateJWT);

router.get('/', list);
router.get('/:id', listByUserId);

router.post(
	'/',
	[
		check('concept', 'The name is requiered').not().isEmpty(),
		check('amount', 'The amount must be a number').isNumeric(),
		check('type', 'The type is requiered').not().isEmpty(),
		fieldsValidator,
	],
	add
);

router.put('/:id', update);

router.delete('/:id', del);

module.exports = router;
