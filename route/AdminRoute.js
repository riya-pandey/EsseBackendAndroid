const express = require('express'); 
const router = express.Router();
const Admin = require('../model/AdminModel');
const {check,validationResult}=require('express-validator')
const bcryptjs= require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

//LogIn 
//req-- if client send data then..
//params-- url bata pathauda, //body-- body pathauda
router.post('/admin/register',
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
        
    
    const username = req.body.username
    const password= req.body.password

     //encrypt 
    bcryptjs.hash(password,10,function(err, hash){ //if it ok then it will return hash value otherwise err value
        const info = new Admin({ username:username, password:hash})
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
router.post('/admin/login',function(req,res){
    const username= req.body.username;
    const password = req.body.password;
    //console.log(username)
    //now need to find if the users exist or not
    Admin.findOne({username:username})
    .then(function(AdminData){
        if(AdminData=== null){
            // username doesnot exist
             return res.status(403).json({message:"Invalid username or password"});
        }
            // if username exist then check password
        bcryptjs.compare(password,AdminData.password,function(err,validationResult){
            if (validationResult=== false){
                return res.status(403).json({message:"Invalide username or password"})
            }

            //token generate
            const Admintoken = jsonwebtoken.sign({AdminId: AdminData._id }, 'secretkey');
            res.status(200).json({
                success:true,
                token:Admintoken,
                usertype:"Admin"
             })
          
            })
    })
    .catch(function(err){
        res.status(500).json
        ({message:"Auth error"})
    })

})
module.exports = router