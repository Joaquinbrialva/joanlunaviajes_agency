require('dotenv').config();
const express = require('express');
const {
	logErrors,
	ormErrorHandler,
	boomErrorHandler,
	errorHandler,
} = require('./middlewares/error.handler.js');
const morgan = require('morgan');
const routerApi = require('./routes/index.routes');
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(morgan('dev'));
routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Servidor escuchando en puerto ${port}`);
});

module.exports = app;
