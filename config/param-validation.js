const Joi = require('joi');

const createUser = Joi.object()
  .keys({
    email: Joi.string().min(3).max(150).email().required(),
    password: Joi.string()
      .min(6)
      .required(),
    name: Joi.string().required(),
  });

const loginVerify = Joi.object()
.keys({
  email: Joi.string().min(3).max(150).email().required(),
  password: Joi.string()
    .min(6)
    .required()
});

module.exports = {
  createUser,
  loginVerify  
};
