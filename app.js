const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require("dotenv").config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("./swagger.json");

const authRouter = require('./routes/api/authRoutes');
const projectsRouter = require('./routes/api/projectsRoutes');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use('/api/auth', authRouter);
app.use('/api/projects', projectsRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Internal Server Error' } = err;
  res.status(status).json({ message })
});

module.exports = app;
