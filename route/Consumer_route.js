const express = require('express')
const router = express.Router()
const Consumer = require('../model/Consumer_model')
const {check,validationResult}=require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const upload = require('../middleware/upload')
const auth = require('../middleware/auth')
const { verifyConsumer } = require('../middleware/auth')

router.post('/user/register',
// [
//     check('fullname',"Please enter your full name!!!!").not().isEmpty(),
//     check('username',"Please enter your username name!!!!").not().isEmpty(),
//     check ('email',"Invalid Email address!!!!").isEmail(),
//     check("password","Password is required and must be min 8 digits!!!!!!").not().isEmpty().isLength({min:8, max:20}),   
//     check("contact","value must be 5-10 characters").isLength({min:5, max:10})
// ],
 function(req, res){
    const errors = validationResult(req);
   // res.send(errors.array())

    if(errors.isEmpty()){
        
    const fullname = req.body.fullname
    const user = req.body.username
    const address = req.body.address
    const contact = req.body.contact
    const email = req.body.email
    const pwd = req.body.password

     //encrypt 
    bcryptjs.hash(pwd,10,function(err, hash){ //if it ok then it will return hash value otherwise err value
        const info = new Consumer({fullname:fullname, username:user, address:address, contact:contact, email:email, password:hash})
        info.save()
        .then(function(result){
            res.status(200).json({success:true})
        })
        .catch(function(err){
            res.status(500).json({success:false})
        })
    })
    }else{
        res.status(400).json(errors.array())
    }
})

//login system
//1. we have to fetch username and password from client
//2.find if the user is exit
router.post('/user/login', function(req,res){
    const username = req.body.username
    const password = req.body.password // user provided password
    //now we have to find if the user exits
    Consumer.findOne({username:username})// if you need one data then findOne() and if need more than 1 data then find()
    .then(function(ConsumerData){
        if(ConsumerData === null){
            //username doesnot exits
            return res.status(403).json({success:false})
        }
        //username is correct or true
        bcryptjs.compare(password, ConsumerData.password,function(err, result){
            if(result===false){
                return res.status(403).json({success:false})
            }
            // res.send("correct!!!")
            //for token npm i jsonwebtoken --save
            // to generate token
            const token = jwt.sign({consumerId:ConsumerData._id}, 'csecretkey')
            res.status(200).json({
                success:true,
                 token:token, 
                 data:ConsumerData.username,
                 usertype:"Consumer",
                 
 
                 

                 
            })
        })
    })
    .catch(function(err){
        res.status(500).json({message:err})
    })
})


router.get('/show_consumer', function(req, res){
    Consumer.find().then(function(data){
        res.send(data)
    })
})
router.get('/show_consumer/:username', function(req, res){
    const username= req.params.username
    Consumer.find({username:username})
    .then(function(data){
        res.status(200).json({
            success:true, 
             data:data
        })
    })
    
})

router.get('/consumer/single/:username', function(req,res){
    const consumer_username = req.params.username;

    Consumer.findOne({ username: consumer_username })
    .then(function(ConsumerData){
        res.status(200).json({ ConsumerData: ConsumerData })
    })
    .catch(function(e){
        res.status(500).json({message:e})
    })
})




router.delete('/user_delete/:id', function(req, res){
    const consumer_id = req.params.id
    User.deleteOne({_id:consumer_id}).then(function(){
        console.log('deleted')
    }) 
})

router.put('/consumer_update/:id', function(req, res){
    const consumer_id = req.params.id
    const fullname = req.body.fullname
    const user = req.body.username
    const address = req.body.address
    const contact = req.body.contact
    const email = req.body.email
    const pwd = req.body.password
    
    User.updateOne({_id:consumer_id},{fullname:fullname, username:user, address:address, contact:contact, 
        email:email, password:pwd}).then(function(){
            console.log("updated")
        })
})

// //profile for user
router.post('/profile',auth.verifyConsumer, function(req, res){
    const username=res.ConsumerData.username;

    Consumer.find({username:username})
    .then(function(result){
        res.status(200).json({success: true,profile:result})
    }).catch(function(e){
        res.status(500).json({success: false})
    })
})

//upload image
router.put("/user/image/:username", upload.single('photo'),async function(req, res){
    if(req.file !==undefined){
        try{
            const image=await clientInformation.findOneAndUpdate({username:req.params.username},{$set:{photo:req.file.filename}},{new:true})
            res.status(200).json({success:true, photoL:image})
        }
        catch(error){
            res.status(500).json({success:false,err:error})
        }
    }
})

//logout
router.get('/logout',(req,res)=>{ 
    res.cookie('token','none',{
        expires:new Date(Date.now()+10*1000),
        httpOnly: true,
    });
    res.status(200).json({success:true, message: 'User Logged Out'});
})


module.exports = router