const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            educationalOrganizationName:Joi.string().required(),
            educationalOrganizationPhoneNumber:Joi.string(),
            educationalOrganizationLocation:Joi.string(),
            educationalOrganizationCertificates:Joi.array(),
            educationalOrganizationTrainingPrograms:Joi.array(),
            educationalOrganizationCourses:Joi.array(),
            educationalOrganizationMasterClasses:Joi.array(),
            educationalOrganizationEducators:Joi.array(),
        }
        return Joi.validate(request, createSchema)
    
    },
    updateValidation:request=>{
        const updateSchema={
            educationalOrganizationName:Joi.string().required(),
            educationalOrganizationPhoneNumber:Joi.string(),
            educationalOrganizationLocation:Joi.string(),
            educationalOrganizationCertificates:Joi.array(),
            educationalOrganizationTrainingPrograms:Joi.array(),
            educationalOrganizationCourses:Joi.array(),
            educationalOrganizationMasterClasses:Joi.array(),
            educationalOrganizationEducators:Joi.array(),
        }
        return Joi.validate(request,updateSchema)

    }
} 