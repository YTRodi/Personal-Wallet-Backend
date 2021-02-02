const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'No token - Unauthorized',
		});
	}

	try {
		const payload = jwt.verify(token, process.env.SECRET_KEY);

		req.uid = payload.uid;
		req.name = payload.name;
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: 'Invalid Token',
		});
	}

	next();
};

module.exports = {
	validateJWT,
};
