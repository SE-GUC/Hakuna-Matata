const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            partner_id:Joi.number().required(),
            name:Joi.string().required()
        }
        return Joi.validate(request, createSchema)
    
    },
    updateValidation:request=>{
        const updateSchema={
            name:Joi.string(),
            certificates:Joi.array(),
            training_programs:Joi.array(),
            courses:Joi.array(),
            master_class:Joi.array(),
            educators:Joi.array()
        }
        return Joi.validate(request,updateSchema)

    }
} 