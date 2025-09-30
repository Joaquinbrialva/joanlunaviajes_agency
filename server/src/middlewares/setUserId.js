const setUserId = (req, res, next) => {
	// 1. Extraer el ID del usuario autenticado (del payload del token)
	// 2. Asignar ese ID a req.body.userId
	// 3. Llamar a next()
	const userId = req.user.sub;
	req.body.userId = userId;
	next();
};

module.exports = setUserId;