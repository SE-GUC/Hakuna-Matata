const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name: Joi.string().min(3).required(),
            id: Joi.number().min(1).required(),
            department:Joi.string().min(2).required(),
            // email: Joi.string().email().required(),
            // password: Joi.string().required(),
                }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            name: Joi.string().min(3),
            id: Joi.number().min(1),
            password: Joi.string(),
            //notifications: Joi.array().schemaType(Number)
        }

        return Joi.validate(request, updateSchema)
    }, 
}