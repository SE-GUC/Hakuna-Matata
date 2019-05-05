const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            content:Joi.string().required(),
            applyingMemberId:Joi.string().required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            content:Joi.string(),
            active:Joi.boolean()
        }

        return Joi.validate(request, updateSchema)
    }, 
}