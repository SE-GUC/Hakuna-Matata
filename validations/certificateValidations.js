const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string().required(),
      type: Joi.string().required(),
      accreditation: Joi.string().required()
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
