const boom = require('@hapi/boom'); // Necesitas importar boom aquí o usarlo de otra forma

function setUserId(req, res, next) {
	if (!req.user || !req.user.sub) {
		return next(boom.unauthorized('Token inválido o usuario no adjunto.'));
	}

	try {
		const userId = req.user.sub;
		req.body = req.body || {};
		req.body.userId = userId;
		next();
	} catch (error) {
		next(error);
	}
}

module.exports = setUserId;
