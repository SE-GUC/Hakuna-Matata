const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name: Joi.string().required(),
            information: Joi.string().required(),
            partners: Joi.array().items(Joi.string()).required(),
            fieldOfWork: Joi.string().required(),
            projects: Joi.array().items(Joi.string()).required(),
            feedbackForm: Joi.string().required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            name: Joi.string(),
            information: Joi.string(),
            partners: Joi.array().items(Joi.string()),
            fieldOfWork: Joi.string(),
            projects: Joi.array().items(Joi.string()),
            feedbackForm: Joi.string()
        }

        return Joi.validate(request, updateSchema)
    }, 
}