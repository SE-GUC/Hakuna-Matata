const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name:Joi.string().required(),
            educator_name:Joi.string().required(),
            description:Joi.string().required(),
            places:Joi.number().integer().required(),
            available_places:Joi.number().integer().required(),
            payment:Joi.string().required(),
            course_duration:Joi.string().required(),
            start_date:Joi.date().required(),
            end_date:Joi.date().required(),
            categories:Joi.string().required(),
            available:Joi.boolean().required()
        }

        return Joi.validate(request, createSchema)},

        updateValidation:request=>{
        const updateschema={
            name:Joi.string().required(),
            educator_name:Joi.string(),
            description:Joi.string(),
            places:Joi.number().integer(),
            available_places:Joi.number().integer(),
            payment:Joi.string(),
            course_duration:Joi.string(),
            start_date:Joi.date(),
            end_date:Joi.date(),
            categories:Joi.string(),
            available:Joi.boolean()
        }
        return Joi.validate(request,updateschema)
   }

    }