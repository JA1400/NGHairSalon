const Joi = require("joi");

module.exports.serviceSchema = Joi.object().keys({
  title: Joi.string().required(),
  price: Joi.number().required().min(0),
  description: Joi.string().required(),
});

module.exports.contactSchema = Joi.object({
  phone: Joi.string().required(),
  email: Joi.string().required(),
  address: Joi.string().required(),
});

module.exports.inquirySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  subject: Joi.string().required(),
  message: Joi.string().required(),
});

module.exports.testimonialSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  message: Joi.string().required(),
});
