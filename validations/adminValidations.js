const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name: Joi.string().min(3).max(50).required(),
            id: Joi.number().min(1).required(),
         //   notifications: Joi.array().schemaType(Number)
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            name: Joi.string().min(3).max(50).required(),
            id: Joi.number().min(1).required(),
            //notifications: Joi.array().schemaType(Number)
        }

        return Joi.validate(request, updateSchema)
    }, 
}