const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
        name: Joi.string().required(),
      // experienceLevel: Joi.number().integer(),
      contact: Joi.string().required()
    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
        name: Joi.string(),
      // experienceLevel: Joi.number()
      //   .integer()
      //   .min(1)
      //   .max(500),
      // certifactes: Joi.string().min(3).max(500),
      contact: Joi.string(),
        // certifactes:Joi.array()
    };

    return Joi.validate(request, updateSchema);
  }
};
