const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {
	return new Promise((resolve, reject) => {
		const payload = { uid, name };
		const options = { expiresIn: '2h' };

		jwt.sign(payload, process.env.SECRET_KEY, options, (err, token) => {
			if (err) {
				console.log(err);
				reject(`Token couldn't be generated`);
			}

			resolve(token);
		});
	});
};

module.exports = {
	generateJWT,
};
