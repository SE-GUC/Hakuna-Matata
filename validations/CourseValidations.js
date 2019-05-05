const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name:Joi.string().required(),
<<<<<<< HEAD
            educator:Joi.object().required(),
=======
            educatorName:Joi.object().required(),
>>>>>>> master
            description:Joi.string().required(),
            places:Joi.number().integer().required(),
            availablePlaces:Joi.number().integer(),
            payment:Joi.number().required(),
<<<<<<< HEAD
            courseDuration:Joi.string(),
            startDate:Joi.date().required(),
            endDate:Joi.date().required(),
            category:Joi.string().required(),
            isAvailable:Joi.boolean(),
=======
            courseDuration:Joi.string().required(),
            startDate:Joi.date().required(),
            endDate:Joi.date().required(),
            category:Joi.string().required(),
            isAvailable:Joi.boolean().required(),
>>>>>>> master
            listOfApplied:Joi.array(),
            listOfAccepted:Joi.array()
        }

        return Joi.validate(request, createSchema)},

        updateValidation:request=>{
        const updateschema={
            name:Joi.string(),
<<<<<<< HEAD
            educator:Joi.object(),
=======
            educatorName:Joi.object(),
>>>>>>> master
            description:Joi.string(),
            places:Joi.number().integer(),
            availablePlaces:Joi.number().integer(),
            payment:Joi.number(),
            courseDuration:Joi.string(),
            startDate:Joi.date(),
            endDate:Joi.date(),
            category:Joi.string(),
            isAvailable:Joi.boolean(),
            listOfApplied:Joi.array(),
            listOfAccepted:Joi.array()
        }
        return Joi.validate(request,updateschema)
   }

    }
