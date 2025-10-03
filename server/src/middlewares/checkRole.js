const boom = require('@hapi/boom');
const { AUTH_MESSAGES } = require('../utils/messages');

function checkRole(...allowedRoles) {
	return (req, res, next) => {
		const userRole = req.user.role;
		if (!allowedRoles.includes(userRole)) {
			return next(boom.forbidden(AUTH_MESSAGES.FORBIDDEN));
		}
		next();
	};
}

module.exports = checkRole;
