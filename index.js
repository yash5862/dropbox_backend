const mongoose = require('mongoose');
const express = require('express');
// config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/express');
const APIError = require('./server/helpers/APIError');
const httpStatus = require('http-status');

// connect to mongo db
const mongoUri = config.mongo.host;
const mongoConfig = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: true,
  poolSize: 2,
  promiseLibrary: global.Promise,
  useUnifiedTopology: true
};

app.use(express.json());
app.use(express.urlencoded({extended:false}));

mongoose.connect(mongoUri, mongoConfig);

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

app.listen(config.port, () => {
  console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
});

app.use(errorHandler);

function errorHandler (err, req, res, next) {
  res.status(httpStatus.INTERNAL_SERVER_ERROR)
  res.render('error', new APIError(err, httpStatus.INTERNAL_SERVER_ERROR));
}

module.exports = app;
