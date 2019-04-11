const express = require('express')
const router = express.Router();

const  User  = require('../models/User.js');
const userValidator = require('../validations/userValidations.js')


//get all users
router.get('/', async (req,res) => {
    const users = await User.find()
    res.json({data: users})
})

//get Certin user
router.get('/:id', async (req,res) => {
    const id = req.params.id
    const user = await User.findById(id)
    res.json({msg:'get the user successfully', data: user})

})

// Create a user
router.post('/', async (req,res) => {
   try {
    const isValidated = userValidator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newUser = await User.create(req.body)
    res.json({msg:'user was created successfully', data: newUser})
   }
   catch(error) {
       // We will be handling the error later
       console.log(error)
   }  
})

// Update a user
router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const user = await User.findById(id)
     if(!user) return res.status(404).send({error: 'User does not exist'})
     const isValidated = userValidator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const uUser = await User.findByIdAndUpdate(id,req.body)
     res.json({msg: 'User updated successfully', data: uUser})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })
//Delete an User
 router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedUser = await User.findByIdAndRemove( id)
     res.json({msg:'User was deleted successfully', data: deletedUser})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

 

module.exports = router