const express = require('express');
const router = express.Router();

const {check,validationResult} = require('express-validator');
const auth = require('../middleware/auth');
 const User = require('../models/User');
 const Contact = require('../models/Contact');



// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const config = require('config');



// @route   Get Api/contacts
//@desc     Get all the user's contacts
//@access   private
router.get('/',auth,async (req,res)=>{
 try {
   const contacts = await Contact.find({user : req.user.id}).sort({
      date : -1
  
   })
      res.json(contacts);
 } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
 }
}); 


// @route   Post Api/contacts
//@desc     Add new Contacts
//@access   private
router.post('/',[auth,[

  check('name','name is required').not().isEmpty()


]], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){

      return res.status(400).json({errors:errors.array()});
    }
   const {name,email,phone,type} = req.body;

    try {
          const newContacts = new Contact({
          name ,
          email,
          phone,
          type,
          user : req.user.id



          })
          const contact = await newContacts.save();
          res.json(contact);
    } catch (err) {
       console.error(err.message);
       res.status(500).send('Server Error');
    }


 }); 

 
// @route   Put Api/contacts : id
//@desc     update  the user's contacts
//@access   private
router.put('/:id',auth,async (req,res)=>{
   const {name,email,phone,type} = req.body;

   const contactFields = {};

   if(name) contactFields.name = name ;
   if(email)   contactFields.email = email ;
   if(phone)   contactFields.phone = phone ;
   if(type)   contactFields.type = type ;
  try {
       let contact = await Contact.findById(req.params.id);

       // check if the contact exist 
       if(!contact)  return res.status(404).json({msg:'This contact does not exist'});

       // if the contact exist , then make sure the currently Signed in User  owns the contact
       if(contact.user.toString()!==req.user.id){
          return res.status(401).json({msg:'You do not have correct authorization to update the contact'})
       }
          // Update contact if above condition pass 
          contact = await Contact.findByIdAndUpdate(req.params.id,
            {$set: contactFields },
            {new: true}
         
         );    
         res.json(contact);



       
       
  } catch (err) {
          console.error(err.message);
          res.status(500).json({msg:'Server error'});     
  }
 
 }); 

 // @route   delete Api/contacts : id
//@desc     Delete a user's contacts
//@access   private
router.delete('/:id',auth,async(req,res)=>{
  

   try {
      let contact = await Contact.findById(req.params.id);

      // check if the contact exist 
      if(!contact)  return res.status(404).json({msg:'This contact does not exist'});

      // if the contact exist , then make sure the currently Signed in User  owns the contact
      if(contact.user.toString()!==req.user.id){
         return res.status(401).json({msg:'You do not have correct authorization to update the contact'}) }
                 
          // find and remove the contact from MongoDB
          await Contact.findByIdAndRemove(req.params.id);


         // Return a confirmation Messeges
      
        res.json({msg:'This contact has been removed '});



      
      
 } catch (err) {
         console.error(err.message);
         res.status(500).json({msg:'Server error'});     
 }
   //  res.send('Delete the Users contacts ');
 
 }); 

module.exports = router;
