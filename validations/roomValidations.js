const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            reservedId: Joi.string(),
            capacity: Joi.number().integer().required(),
            reservedDate: Joi.date(),
            endOfReservation: Joi.date(),
            reserved: Joi.boolean()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            capacity: Joi.number().integer(),
            reserved: Joi.boolean(),
            reservedDate: Joi.date(),
            endOfReservation: Joi.date(),
            reservedId: Joi.string()
        }

        return Joi.validate(request, updateSchema)
    }, 

    reserveValidation: request => {
        const reserveSchema = {
            reservedDate: Joi.date().required(),
            endOfReservation: Joi.date().required(),
            reservedId: Joi.string().required()
        }

        return Joi.validate(request, reserveSchema)
    }, 
}