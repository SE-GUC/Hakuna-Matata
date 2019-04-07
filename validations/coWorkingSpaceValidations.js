const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name: Joi.string().required(),
            phoneNumber: Joi.string().required(),
            location: Joi.string().required(),
            businessPlans: Joi.string().required(),
            facilites: Joi.string().required(),
            maxNoRooms: Joi.number().integer().required()

        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            partnerId: Joi.string(),
            name: Joi.string(),
            phoneNumber: Joi.string(),
            location: Joi.string(),
            businessPlans: Joi.string(),
            facilites: Joi.string(),
            rooms: Joi.array(),
            maxNoRooms: Joi.number().integer()
        }

        return Joi.validate(request, updateSchema)
    }, 
}