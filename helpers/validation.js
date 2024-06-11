const Joi = require("joi");

const authorValidation = Joi.object({
  name: Joi.string().alphanum().min(3).max(10).required().messages({
    "string.empty": "Name is can not be empty",
    "string.min": "Name must have at least {#limit} characters",
    "string.max": "Name is maximum {#limit} characters",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "in"] },
    })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{4,10}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must be between 4 and 10 characters long and can only contain letters and numbers.",
      "string.empty": "Password is a required.",
    }),
  MobileNumber: Joi.string()
    .pattern(new RegExp("^[0-9]{10}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Mobile number must be exactly 10 digits long and can only contain numbers.",
      "any.required": "Mobile number is a required.",
      "string.empty":"Mobile number is a required",
    }),
});

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
  title: Joi.string().min(1).max(20).required(),
  desc: Joi.string().min(1).required(),
  image: Joi.string().required(),
  price: Joi.number().required(),
  cat_id: Joi.string().required()
})
module.exports = { authorValidation, adminLogin, bookValidation };
