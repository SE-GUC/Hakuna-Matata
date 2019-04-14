const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            fullName: Joi.string().min(2).max(30).required(),
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            email: Joi.string().email(),
            password: Joi.string(),
            fullName: Joi.string().min(2).max(30),
        }

        return Joi.validate(request, updateSchema)
    }, 
    registerValidation: request => {
        const registerSchema = {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            fullName: Joi.string().min(2).max(30).required(),
        }

        return Joi.validate(request, registerSchema)
    },

    loginValidation: request => {
        const loginSchema = {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
        return Joi.validate(request, loginSchema)
    }
}