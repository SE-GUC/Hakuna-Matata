const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const passport = require('passport')
const Joi = require('joi');
const rendomstring=require('randomstring')
const  User  = require('../../models/User.js');
const  Platform  = require('../../models/Platform.js');
const userValidator = require('../../validations/userValidations.js')

const tokenKey = require('../../config/keys').secretOrKey
const nodemailer = require('nodemailer');


//get all users
router.get('/', async (req,res) => {
    const users = await User.find()
      return res.json(users)
})
router.get('/platform/:id',passport.authenticate('jwt', {session: false}),async (req,res) => {
    const id = req.params.id
    const user = await  User.findById(id)
    const platform= await Platform.find()
    var platformUser=platform.filter((post)=>
        post.tags.filter(value=>user.tags.includes(value)).length>0
    )
    res.send(platformUser)
})

//get Certin user
router.get('/:id', passport.authenticate('jwt', {session: false}),async (req,res) => {
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

 router.post('/register', async (req, res) => {
	try {
		const isValidated = userValidator.registerValidation(req.body);
		if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
		const { email, password,displayedName} = req.body;
		const user = await User.findOne({ email });
		if (user) return res.status(400).json({ msg: 'Email already exists' });
		const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

             
        
        

        
        const emailToken=rendomstring.generate();
        
        
		const newUser = new User({
			
			password: hashedPassword,
            email,
            secretToken:emailToken,
            displayedName

        
        });
        
       
    await User.create(newUser);
    res.json({ msg: 'User created successfully', data: newUser });




    const output = `
    <p>You have a new contact request</p>
    <h3>Verification Details</h3>
    <ul>  
      <li>Name: ${displayedName}</li>
     
      <li>Email: ${req.body.email}</li>

      <li>token: ${emailToken}</li>
    </ul>
    <h3> Please  verify your account ,you need to copy the above token in the verification page to be verified .Thank you </h3>
    
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        type: 'OAuth2',
        user: 'abdelrahmanbadr37@gmail.com', // generated ethereal user
        clientId: '973482720824-9bltnl48s74lafcp8h10mgo2ckd5dknr.apps.googleusercontent.com',
        clientSecret: '2xr5J3FohirwH0Vz2uk-qKiT',
        refreshToken: '1/t3MgQQApEuk-7Z0uD0-vMXcwnNiC0mykMvQ3ySKq2ug',
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer" <abdelrahmanbadr37@gmail.com>', // sender address
      to: `${req.body.email}`, // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.send('Done')
  });
    

		
	} catch (error) {
		res.status(422).send({ error });
	}
});



//verification

router.post('/verify',async(req,res)=>{
    try{const{secretToken}=req.body;

    const user=await User.findOne({secretToken});
    
    if(!user){
    
    return res.status(404).json({email:'no user for this token '})
        
    }
    user.active = true;
    user.emailVerified = true;
    // res.json(user.active)
    user.secretToken ='';
    await user.save();

    res.json({msg:'success',user:{user}})
    
}catch (error) {
    return res.status(404).json({email:'faild '})
}
    
});

router.post('/login', async (req, res) => {
	try {
        const isValidated = userValidator.loginValidation(req.body);
		if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
		const { email, password } = req.body;
		const userfound = await User.findOne({ email });
		if (!userfound) return res.status(404).json({ msg: 'Email does not exist' });
		const match = bcrypt.compareSync(password, userfound.password);
		if (match) {            
            const user = {
                id: userfound._id,
                email: userfound.email
            }   
            const token = jwt.sign(user, tokenKey, { expiresIn: '24h' })
            return res.json({token: `Bearer ${token}`,id:userfound._id, tags:userfound.tags,data:userfound})
        }
		else return res.status(400).send({ msg: 'Wrong password' });
	} catch (e) {
        return res.send({ error: e });
    }
});
router.get('/history/:id',async (req,res)=>{
    try{
        const schema = {
            id:Joi.string()
        }
            const result = Joi.validate(req.params, schema);
            if (result.error) return res.status(400).send({ error: result.error.details[0].message })
            console.log('here') 
            const user=await User.findById(req.params.id)
            if(user)
            {
            res.json({data:user.history})
            }
            else{
                res.status(404).send('User not found')  
            }
    }
    catch(error){
        console.log(error)
        res.status(400).send('error with the data base')
    }
})
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }

module.exports = router