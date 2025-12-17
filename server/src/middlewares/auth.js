const passport = require('../authentication/index'); // Tu inicializador de Passport
const { AUTH_MESSAGES } = require('../utils/messages');
const { unauthorized } = require('../utils/response');

function checkJwt() {
	return (req, res, next) => {
		passport.authenticate('jwt', { session: false }, (err, user, info) => {
			if (info && info.name === 'TokenExpiredError') {
				return unauthorized(res, AUTH_MESSAGES.SESSION_EXPIRED);
			}

			if (!user) {
				return unauthorized(res, AUTH_MESSAGES.UNAUTHORIZED);
			}

			req.user = user;
			next();
		})(req, res, next);
	};
}

module.exports = { checkJwt };
