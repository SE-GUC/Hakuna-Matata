const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name:Joi.string().required(),
            taskPartner:Joi.string().required(),
            description:Joi.string().required(),
            consultyNeeded:Joi.boolean().required(),
            deadline:Joi.date().required(),
            commitLevel:Joi.number().integer().min(1).max(5).required(),
            experienceLevel:Joi.number().integer().min(0).max(5).required(),
            monetaryCompensation:Joi.number().required(),
            requiredSkills:Joi.array().required(),
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            name:Joi.string(),
            taskPartner:Joi.string(),
            description:Joi.string(),
            consultyNeeded:Joi.boolean(),
            deadline:Joi.date(),
            commitLevel:Joi.number().integer().min(1).max(5),
            experienceLevel:Joi.number().integer().min(0).max(5),
            monetaryCompensation:Joi.number(),
            requiredSkills:Joi.array(),
        }

        return Joi.validate(request, updateSchema)
    }, 
}