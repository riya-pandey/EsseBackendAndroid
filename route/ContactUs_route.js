const express = require('express')
const router = express.Router()
const Contact =require("../model/ContactUsModel")
const {check,validationResult}=require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/user/contact',

 function(req, res){
    const errors = validationResult(req);
   // res.send(errors.array())

    if(errors.isEmpty()){ 
        const fullname = req.body.fullname  
        const email = req.body.email
        const phone = req.body.phone
        const message = req.body.message
  

     //encrypt 
    //if it ok then it will return hash value otherwise err value
        const info = new Contact({fullname:fullname,email:email,phone:phone,message:message})
        info.save()
        .then(function(result){
            res.status(200).json({success:true})
        })
        .catch(function(err){
            res.status(500).json({success:false})
        })
  
}
 })

module.exports = router