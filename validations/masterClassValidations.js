const Joi = require("joi");



module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string()
        .min(3)
        .max(500)
        .required(),
      description: Joi.string()
        .min(3)
        .max(500)
        .required(),
      payment: Joi.string()
        .min(3)
        .max(500)
        .required(),
      places: Joi.number()
        .integer()
        .min(3)
        .max(500)
        .required(),
      availablePlaces: Joi.number()
        .integer()
        .min(3)
        .max(500)
        .required(),

      MasterClassDuration: Joi.string()
        .min(3)
        .max(500)
        .required(),
      startDate: Joi.string()
        .min(3)
        .max(500)
        .required(),
      endDate: Joi.string()
        .min(3)
        .max(500)
        .required(),
      levelOfStudents: Joi.string()
        .min(3)
        .max(500)
        .required(),
      effort: Joi.string()
        .min(3)
        .max(500)
        .required(),
      isAvailable: Joi.boolean().required(),
      courses:Joi.array(),
      listOfApplied:Joi.array(),
      listOfAccepted:Joi.array(),
      educationalOrganization:Joi.object()

    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
      name: Joi.string()
        .min(3)
        .max(500),
      description: Joi.string()
        .min(3)
        .max(500),
      payment: Joi.string()
        .min(3)
        .max(500),
      places: Joi.number()
        .integer()
        .min(3)
        .max(500),
      availablePlaces: Joi.number()
        .integer()
        .min(3)
        .max(500),

      MasterClassDuration: Joi.string()
        .min(3)
        .max(500),
      startDate: Joi.string()
        .min(3)
        .max(500),
      endDate: Joi.string()
        .min(3)
        .max(500),
      levelOfStudents: Joi.string()
        .min(3)
        .max(500),
      effort: Joi.string()
        .min(3)
        .max(500),
      isAvailable: Joi.boolean(),
      courses:Joi.array(),
      listOfApplied:Joi.array(),
      listOfAccepted:Joi.array(),
      educationalOrganization:Joi.object()
    };

    return Joi.validate(request, updateSchema);
  }
};
