const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            description:Joi.string().required(),
            consultyNeeded:Joi.boolean().required(),
            deadline:Joi.string().required(),
            commitLevel:Joi.number().integer().min(1).max(5).required(),
            experienceLevel:Joi.number().integer().min(0).max(5).required(),
            monetaryCompensation:Joi.number().required(),
            requiredSkills:Joi.array().required(),
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            description:Joi.string(),
            requiredSkills:Joi.array(),
            monetaryCompensation:Joi.number(),
            deadline:Joi.string(),
            deadlineForApply:Joi.string(),
            experienceLevel:Joi.number().integer().min(0).max(5),
            commitLevel:Joi.number().integer().min(1).max(5)
        }

        return Joi.validate(request, updateSchema)
    }, 
    createConsaltedValidation: request => {
        const CreateConsaltedSchema = {
            description: Joi.string().required(),
            deadline: Joi.date().required(),
            commitLevel: Joi.number().integer().min(0).max(5).required(),
            experienceLevel: Joi.number().integer().min(0).max(5).required(),
            monetaryCompensation: Joi.number().required(),
            requiredSkills: Joi.array().required(),
        }

        return Joi.validate(request, CreateConsaltedSchema)
    }, 

    updateConsaltedValidation: request => {
        const UpdateConsaltedSchema = {
            description: Joi.string(),
            requiredSkills: Joi.array(),
            monetaryCompensation: Joi.number(),
            deadline: Joi.string(),
            deadlineForApply: Joi.string(),
            experienceLevel: Joi.number().integer().min(1).max(5),
            commitLevel: Joi.number().integer().min(1).max(5)
        }

        return Joi.validate(request, UpdateConsaltedSchema)
    }, 


}