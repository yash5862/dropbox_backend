const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const httpStatus = require('http-status');
const expressValidation = require('express-validation');
const routes = require('../index.route');
const config = require('./config');
const APIError = require('../server/helpers/APIError');
const Path = require('path');

const app = express();

const imagesRoot = Path.join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(imagesRoot));

// parse body params and attache them to req.body
app.use(bodyParser.json({
  limit: '1500mb'
}));
app.use(bodyParser.urlencoded({
  limit: '1500mb',
  extended: true
}));

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const option = {
  definition:{
    openapi :  '3.0.0',
    "info": {
      "version": "1.0.0", //version of the OpenAPI Specification
      "title": "Dropbox Backend Service",
      "description": "A backend service for Dropbox",
      "license": {
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT"
      }
    },
    "components":{
      "securitySchemes":{
        "Bearer": {
          "type": "apiKey",
          "name": "Authorization",
          "in": "header"
      },

      }
    }
    ,
    "host": "localhost:4040",
    "basePath": "/",
    "tags": [
      {
        "name": "Dropbox Backend Service",
        "description": "A backend service for Dropbox"
      }
    ],
    "schemes": ["http"],
    "consumes": ["application/json","multipart/form-data"],
    "produces": ["application/json","multipart/form-data"],
    
  },
  apis: ['server/apis/**/*.js']
};

// mount all routes on /api path
app.use('/api', routes);

// if error is not an instanceOf APIError, convert it.
// app.use((err, req, res, next) => {
  
//   if (err instanceof expressValidation.ValidationError) {
//     // validation error contains errors which is an array of error each containing message[]
//     const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
//     const error = new APIError(unifiedErrorMessage, err.status, true);
//     return next(error);
//   } else if (!(err instanceof APIError)) {
//     const apiError = new APIError(err.message, err.status, err.isPublic);
//     return next(apiError);
//   }
//   return next(err);
// });

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});



// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'production' ? err.stack : {}
  })
);

// app.use(j);
module.exports = app;
