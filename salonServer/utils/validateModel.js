const {
  serviceSchema,
  testimonialSchema,
  inquirySchema,
  contactSchema,
} = require("../schemas.js");

module.exports.validateService = (req, res, next) => {
  const { error } = serviceSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports.validateTestimonial = (req, res, next) => {
  const { error } = testimonialSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports.validateInquiry = (req, res, next) => {
  const { error } = inquirySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports.validateContact = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
