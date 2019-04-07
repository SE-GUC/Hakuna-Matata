const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            taskId:Joi.string().required(),
            partnerId:Joi.string().required(),
            link:Joi.string().required()    
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            link:Joi.string().required()    
        }

        return Joi.validate(request, updateSchema)
    }, 
}