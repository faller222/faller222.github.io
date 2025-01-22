const express = require('express');
const { dogRouter } = require('./dogController');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');

const app = express();
const PORT = 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/dog/', dogRouter);

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});