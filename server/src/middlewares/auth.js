const passport = require('../authentication/index'); // Tu inicializador de Passport

function checkJwt() {
	return passport.authenticate('jwt', { session: false });
}

module.exports = { checkJwt };
