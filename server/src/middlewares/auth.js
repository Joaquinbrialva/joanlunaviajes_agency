const boom = require('@hapi/boom');

function checkRole(req, res, next) {
	try {
		const role = req.payload.role;

		if (role === 'admin') {
			next();
		} else {
			throw boom.forbidden();
		}
	} catch (error) {
		next(error);
	}
}
