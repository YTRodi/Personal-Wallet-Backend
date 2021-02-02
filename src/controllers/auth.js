const { response } = require('express');
const chalk = require('chalk');
const bcrypt = require('bcryptjs');
const {
	models: { User },
} = require('../database/database');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		let user = await User.findOne({
			where: { email },
		});

		if (user) {
			return res.status(400).json({
				ok: false,
				msg: 'There is already a user with this email',
			});
		}

		// Encrypt the password
		const salt = bcrypt.genSaltSync();

		user = {
			...req.body,
			balance: 0,
			password: bcrypt.hashSync(password, salt),
		};

		user = await User.create(user);

		// Generate JWT
		const token = await generateJWT(user.id, user.name);

		res.status(201).json({
			ok: true,
			uid: user.id,
			name: user.name,
			token,
		});
	} catch (error) {
		console.log(chalk.bgRed(error));

		res.status(500).json({
			ok: false,
			msg: 'Please talk to the administrator.',
		});
	}
};

const loginUser = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		let user = await User.findOne({
			where: { email },
		});

		console.log(user);
		if (!user) {
			return res.status(400).json({
				ok: false,
				msg: 'There is no user with that email',
			});
		}

		// Confirm passwords ( all of they )
		const validPassword = bcrypt.compareSync(password, user.password);

		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Incorrect Password',
			});
		}

		// Generate JWT
		const token = await generateJWT(user.id, user.name);

		res.json({
			ok: true,
			uid: user.id,
			name: user.name,
			token,
		});
	} catch (error) {}
};

const revalidateToken = async (req, res = response) => {
	const { uid, name } = req;

	// Generate JWT
	const token = await generateJWT(uid, name);

	res.json({
		ok: true,
		uid,
		name,
		token,
	});
};

module.exports = {
	createUser,
	loginUser,
	revalidateToken,
};
