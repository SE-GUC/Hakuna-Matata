const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            educationOrganizationName:Joi.string().required(),
            educationOrganizationPhoneNumber:Joi.string(),
            educationOrganizationLocation:Joi.string(),
            educationOrganizationCertificates:Joi.array(),
            educationOrganizationTrainingPrograms:Joi.array(),
            educationOrganizationCourses:Joi.array(),
            educationOrganizationMasterClasses:Joi.array(),
            educationOrganizationEducators:Joi.array(),
        }
        return Joi.validate(request, createSchema)
    
    },
    updateValidation:request=>{
        const updateSchema={
            educationOrganizationName:Joi.string().required(),
            educationOrganizationPhoneNumber:Joi.string(),
            educationOrganizationLocation:Joi.string(),
            educationOrganizationCertificates:Joi.array(),
            educationOrganizationTrainingPrograms:Joi.array(),
            educationOrganizationCourses:Joi.array(),
            educationOrganizationMasterClasses:Joi.array(),
            educationOrganizationEducators:Joi.array(),
        }
        return Joi.validate(request,updateSchema)

    }
} 