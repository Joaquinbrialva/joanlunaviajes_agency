const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../config/config'); // Ajusta la ruta a tu archivo config
const boom = require('@hapi/boom');

// 1. Definir las opciones para la estrategia
const options = {
	// Le dice a Passport que busque el token en el header Authorization como Bearer Token
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	// Usa la clave secreta que utilizaste para firmar el token
	secretOrKey: config.jwt_secret,
};

// 2. Crear la estrategia
const JwtStrategy = new Strategy(options, (payload, done) => {
	// Si el token es válido, 'payload' contendrá { sub: userId, role }
	try {
		if (!payload || !payload.sub) {
			return done(boom.unauthorized('Invalid token payload'), false);
		}
		// Adjuntamos el payload a req.user (es el estándar de Passport)
		return done(null, payload);
	} catch (error) {
		return done(error, false);
	}
});

module.exports = JwtStrategy;
