const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            partnerName: Joi.string().required(),
            partnerPhoneNumber: Joi.string(),
<<<<<<< HEAD
            partnerLocation: Joi.string(),
            partnerPartners: Joi.array(),
            fieldOfWork: Joi.array(),
=======
            partnerLocation: Joi.string().required(),
            partnerPartners: Joi.array(),
            fieldOfWork: Joi.string().required(),
>>>>>>> master
            partnerProjects: Joi.array(),
            partnerEvents: Joi.array(),
            feedbackForm: Joi.array(),

        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            partnerName: Joi.string(),
            partnerPhoneNumber: Joi.string(),
            partnerLocation: Joi.string(),
            partnerPartners: Joi.array(),
<<<<<<< HEAD
            fieldOfWork: Joi.array(),
=======
            fieldOfWork: Joi.string(),
>>>>>>> master
            partnerProjects: Joi.array(),
            partnerEvents: Joi.array(),
            feedbackForm: Joi.array(),
        }

        return Joi.validate(request, updateSchema)
    }, 
}