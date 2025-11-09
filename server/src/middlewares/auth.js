const passport = require('../authentication/index'); // Tu inicializador de Passport
const { AUTH_MESSAGES } = require('../utils/messages');
const { unauthorized } = require('../utils/response');

function checkJwt() {
	return (req, res, next) => {
		passport.authenticate('jwt', { session: false }, (err, user, info) => {
			if (info && info.name === 'TokenExpiredError') {
				return unauthorized({
					res,
					message: AUTH_MESSAGES.SESSION_EXPIRED,
					details: `Tu token expiró el ${info.expiredAt}`,
				});
			}

			if (!user) {
				return unauthorized({
					res,
					message: AUTH_MESSAGES.UNAUTHORIZED,
					details: info?.message || 'Token inválido o no proporcionado',
				});
			}

			req.user = user;
			next();
		})(req, res, next);
	};
}

module.exports = { checkJwt };
