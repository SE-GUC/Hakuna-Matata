const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            consultancyAgencyName: Joi.string().required(),
<<<<<<< HEAD
            consultancyAgencyManager: Joi.string(),
=======
            consultancyAgencyManager: Joi.string().required(),
>>>>>>> master
            consultancyAgencyHeadquarters: Joi.string(),
            consultancyAgencyRate: Joi.number(),
            consultancyAgencyRevenues: Joi.number(),
            consultancyAgencyRevenuePerEmployee: Joi.number(),
<<<<<<< HEAD
            consultancyAgencyLocation: Joi.array(),
            consultancyAgencyPhoneNumber: Joi.string(),
=======
            consultancyAgencyLocation: Joi.array().required(),
            consultancyAgencyPhoneNumber: Joi.array(),
>>>>>>> master
            consultancyAgencyPartners: Joi.array(),
            consultancyAgencyMembers: Joi.array(),
            consultancyAgencyEvents: Joi.array(),
            consultancyAgencyOffers: Joi.array(),
            consultancyAgencyFiscalYear: Joi.date(),
         };

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            consultancyAgencyName: Joi.string(),
            consultancyAgencyManager: Joi.string(),
            consultancyAgencyHeadquarters: Joi.string(),
            consultancyAgencyRate: Joi.number(),
            consultancyAgencyRevenues: Joi.number(),
            consultancyAgencyRevenuePerEmployee: Joi.number(),
            consultancyAgencyLocation: Joi.array(),
<<<<<<< HEAD
            consultancyAgencyPhoneNumber: Joi.string(),
=======
            consultancyAgencyPhoneNumber: Joi.array(),
>>>>>>> master
            consultancyAgencyPartners: Joi.array(),
            consultancyAgencyMembers: Joi.array(),
            consultancyAgencyEvents: Joi.array(),
            consultancyAgencyReports: Joi.array(),
            consultancyAgencyOffers: Joi.array(),
            consultancyAgencyFiscalYear: Joi.date(),
        }

        return Joi.validate(request, updateSchema)
    }, 
}