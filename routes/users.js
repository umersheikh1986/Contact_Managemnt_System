const express = require('express');
const router = express.Router();

const {check,validationResult} = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

// @route   Post Api/users
//desc      Register a user
// access   is public
router.post('/',[
      check('name','please enter a user name').not().isEmpty(),
      check('email','please enter a valid email address').isEmail(),
      check('password','please enter password of min 6 characters').isLength({min:6})



] , async (req,res)=>{
   // res.send(req.body);
  const errors = validationResult(req);
  if(!errors.isEmpty()){
     return res.status(400).json({errors:errors.array()})

  }
      // res.send('passed without errors');
      const {name,email,password} = req.body
  try{
         let user = await User.findOne({email});
         
         if(user)
         {
     return res.status(400).json({msg:'A User with this email already exists.'});

         }
   user = new User({
         name,
         email,
         password


   });       

   const salt = await bcrypt.genSalt(10);

   user.password = await bcrypt.hash(password,salt);

   await user.save();

   // res.send('user created in mongodb');
   const payload = {
       user:{
             id : user.id
       }
   }

   jwt.sign(payload,config.get('jwtSecret'),{
         expiresIn :3600000      
   },(err,token)=>{
      if(err) throw err;
      res.json({token})

   } );
            
  }
  catch(err){
           console.error(err.message);
           res.status(500).send('Server error');
  }

});

module.exports = router;