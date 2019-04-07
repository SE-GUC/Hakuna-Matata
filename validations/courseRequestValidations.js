const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            description:Joi.string(),
            categories:Joi.string(),
            applyingMemberId:Joi.string()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            description:Joi.string(),
            categories:Joi.string(),
            active:Joi.boolean()
        }

        return Joi.validate(request, updateSchema)
    }, 
}