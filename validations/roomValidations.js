const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            capacity: Joi.number().integer().required(),
            slots: Joi.array().string().required(),
            reviews: Joi.array(),
            reservations: Joi.array(),
            coworkingSpace: Joi.object()
        }

        return Joi.validate(request, createSchema)
    },
    
    updateValidation: request => {
        const updateSchema = {
            capacity: Joi.number().integer(),
            slots: Joi.array(),
            reviews: Joi.array(),
            reservations: Joi.array(),
            comments: Joi.string()
            
        }

        return Joi.validate(request, updateSchema)
    }, 

    reserveValidation: request => {
        const reserveSchema = {
            slot: Joi.string().required(),
            reservationDate: Joi.date().required(),
            reserver: Joi.object().required(),
            isAccpted: Joi.boolean()
        }

        return Joi.validate(request, reserveSchema)
    }, 
}