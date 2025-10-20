require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
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
const YAML = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load(
  fs.readFileSync(path.join(__dirname, '../openapi.yaml'), 'utf8')
);

app.use(express.json());
app.use(morgan('dev'));
routerApi(app);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Servidor escuchando en puerto ${port}`);
});

module.exports = app;
