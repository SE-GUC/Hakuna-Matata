const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            partnerId:Joi.number().required(),
            name:Joi.string().required()
        }
        return Joi.validate(request, createSchema)
    
    },
    updateValidation:request=>{
        const updateSchema={
            name:Joi.string(),
            certificates:Joi.array(),
            trainingPrograms:Joi.array(),
            courses:Joi.array(),
            masterClass:Joi.array(),
            educators:Joi.array()
        }
        return Joi.validate(request,updateSchema)

    }
} 