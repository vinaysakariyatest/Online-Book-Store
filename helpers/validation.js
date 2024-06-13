const Joi = require("joi");


const adminLogin = Joi.object({
    email: Joi.string().email().required()
    .messages({
        "string.empty": "Email is required",
        "string.email": "Please enter a valid email address",
      }),
    password: Joi.string().required()
    .messages({
        'string.empty': "Password is required",
    })
})

const bookValidation = Joi.object({
  title: Joi.string().min(1).max(50).required(),
  desc: Joi.string().min(1).required(),
  // image: Joi.string().required(),
  price: Joi.number().required(),
  cat_id: Joi.string().required(),
  author: Joi.string().required(),
});

const userValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required()
  .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
  password: Joi.string().required(),
  address: Joi.string().min(5).required(),
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      'string.base': 'Phone number must be a string of digits',
      'string.empty': 'Phone number cannot be empty',
      'string.pattern.base': 'Phone number must be exactly 10 digits long',
      'any.required': 'Phone number is required'
    }),
  
});
module.exports = { adminLogin, bookValidation, userValidation};
