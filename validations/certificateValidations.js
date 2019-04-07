const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string()
        .min(3)
        .max(500)
        .required(),
      type: Joi.string()
        .min(3)
        .max(500)
        .required(),
      accreditation: Joi.string()
        .min(3)
        .max(500)
        .required()
    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
      name: Joi.string(),
      type: Joi.string(),
      accreditation: Joi.string()
    };

    return Joi.validate(request, updateSchema);
  }
};
