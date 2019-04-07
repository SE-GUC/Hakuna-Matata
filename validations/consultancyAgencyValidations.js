const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name: Joi.string().required(),
            information: Joi.string().required(),
            partners: Joi.array(),
            members: Joi.array(),
            reports: Joi.array()
         };

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            name: Joi.string(),
            information: Joi.string(),
            partners: Joi.array(),
            members: Joi.array(),
            reports: Joi.array()
        }

        return Joi.validate(request, updateSchema)
    }, 
}