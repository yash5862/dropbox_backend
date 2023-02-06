const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number()
    .default(4040),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number()
    .default(27017),
  SMTP_SERVICE: Joi.string().default('gmail'),
  SMTP_HOST: Joi.string(),
  SMTP_PORT: Joi.number().default(587),
  SMTP_SSL_ENABLE: Joi.boolean().default(true),
  SMTP_SECURE_CONNECTION: Joi.boolean().default(false),
  SMTP_USER: Joi.string().default('support@ruhame.com'),
  SMTP_PASS: Joi.string().default('Ruhame@252$')
}).unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: 'production',
  port: process.env.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: process.env.JWT_SECRET,
  mongo: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT
  }
};

module.exports = config;
