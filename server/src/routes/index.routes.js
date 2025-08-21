const router = require('express').Router();
function routerApi(app) {
	app.use('/api/v1', router, (req, res) => {
		res.send('funciona');
	});
	//otras rutas: ...
}

module.exports = routerApi;
