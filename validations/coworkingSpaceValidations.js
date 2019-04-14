const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            coworkingSpaceName: Joi.string().required(),
            coworkingSpacePhoneNumber: Joi.array(),
            coworkingSpaceLocation: Joi.string().required(),
            coworkingSpaceBusinessPlans: Joi.array(),
            coworkingSpaceFacilites: Joi.string(),
            coworkingSpaceMaxNoRooms: Joi.number().integer()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            coworkingSpaceName: Joi.string(),
            coworkingSpacePhoneNumber: Joi.string(),
            coworkingSpaceLocation: Joi.string(),
            coworkingSpaceBusinessPlans: Joi.array(),
            coworkingSpaceFacilites: Joi.string(),
            coworkingSpaceMaxNoRooms: Joi.number().integer(),
            // this is right or not 
            coworkingSpaceRooms: Joi.array()
                }

        return Joi.validate(request, updateSchema)
    }, 
}