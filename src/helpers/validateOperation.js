const checkBalanceAmount = (user, operation) => {
	const { dataValues } = user;
	let modifiedUser = {};

	if (dataValues.balance >= 0) {
		if (operation.amount >= 1) {
			switch (operation.type) {
				case 'ingreso':
					modifiedUser = {
						...dataValues,
						balance: dataValues.balance + operation.amount,
					};

					break;

				case 'egreso':
					modifiedUser = {
						...dataValues,
						// Logic: when the amount is greater than the balance...
						balance:
							operation.amount >= dataValues.balance ? null : dataValues.balance - operation.amount,
					};

					break;
			}

			if (!modifiedUser.balance) throw new Error('Not enough funds');

			return modifiedUser;
		} else {
			throw new Error('Amount cannot be less than or equal to 0');
		}
	} else {
		throw new Error('Negative balance 🤔');
	}
};

module.exports = {
	checkBalanceAmount,
};
