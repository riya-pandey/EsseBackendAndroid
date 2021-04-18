const express = require('express')
const router = express.Router()
const Profile = require('../model/ProfileModel')
const {check,validationResult}=require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/profile',

 function(req, res){
    const errors = validationResult(req);
   // res.send(errors.array())

    if(errors.isEmpty()){   
    const email = req.body.email
    const Fname = req.body.Fname
    const Lname = req.body.Lname
    const address = req.body.address 
    const city = req.body.city
    const country = req.body.country
    const contact = req.body.contact
    const about = req.body.about

     //encrypt 
    //if it ok then it will return hash value otherwise err value
        const info = new Profile({  email:email, Fname:Fname, Lname:Lname, address:address, city:city, country:country,contact:contact,about:about})
        info.save()
        .then(function(result){
            res.status(200).json({success:true,
                data:info.about})
        })
        .catch(function(err){
            res.status(500).json({success:false})
        })
  
}
 })

 router.get('/profile/:email', function(req,res){
    const pemail = req.params.email;
    Profile.findOne({email:pemail})
    .then(function(info){
        res.status(200).json(info)
    })
    .catch(function(e){
        res.status(500).json({message:e})
    })
})
module.exports = router