/*
    Routes Users / Auth:
    host + /api/auth
 */
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { validateJWT } = require('../middlewares/validateJWT');

router.post(
	'/new',
	[
		check('name', 'The name is requiered').not().isEmpty(),
		check('email', 'The email is requiered').isEmail(),
		check('password', 'The password must be greater than/equal to 6 characters').isLength({ min: 6 }),
		fieldsValidator,
	],
	createUser
);

router.post(
	'/',
	[
		check('email', 'The email is requiered').isEmail(),
		check('password', 'The password must be greater than/equal to 6 characters').isLength({ min: 6 }),
		fieldsValidator,
	],
	loginUser
);

router.get('/renew', validateJWT, revalidateToken);

module.exports = router;
