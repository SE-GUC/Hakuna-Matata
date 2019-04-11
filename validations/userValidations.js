const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            email: Joi.string().required(),
            password: Joi.string().required()
         //   notifications: Joi.array().schemaType(Number)
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            email: Joi.string(),
            password: Joi.string()
            //notifications: Joi.array().schemaType(Number)
        }

        return Joi.validate(request, updateSchema)
    }, 
}