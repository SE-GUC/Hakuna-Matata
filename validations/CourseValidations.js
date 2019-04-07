const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name:Joi.string().required(),
            educatorName:Joi.string().required(),
            description:Joi.string().required(),
            places:Joi.number().integer().required(),
            availablePlaces:Joi.number().integer().required(),
            payment:Joi.number().required(),
            courseDuration:Joi.number().required(),
            startDate:Joi.date().required(),
            endDate:Joi.date().required(),
            categories:Joi.string().required(),
            available:Joi.boolean().required()
        }

        return Joi.validate(request, createSchema)},

        updateValidation:request=>{
        const updateschema={
            name:Joi.string(),
            educatorName:Joi.string(),
            description:Joi.string(),
            places:Joi.number().integer(),
            availablePlaces:Joi.number().integer(),
            payment:Joi.number(),
            courseDuration:Joi.number(),
            startDate:Joi.date(),
            endDate:Joi.date(),
            categories:Joi.string(),
            available:Joi.boolean()
        }
        return Joi.validate(request,updateschema)
   }

    }
