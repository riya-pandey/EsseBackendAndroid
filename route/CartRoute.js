const express = require('express')
const router = express.Router()
const Cart = require('../model/CartModel')
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')

//inserting our product
router.post('/cart/add',auth.verifyConsumer, function(req, res){
  
    console.log(res.ConsumerData.username)
  const ProductName = req.body.ProductName
  const ProductImage = req.body.ProductImage
  const ProductPrice = req.body.ProductPrice
  const ProductDesc = req.body.ProductDesc
  const ProductAvailable = req.body.ProductAvailable
  
  const username =res.ConsumerData.username
  //console.log(username)
  
  //{variable:modelname}
  const CartData = new Cart({ProductName:ProductName, ProductImage:ProductImage,ProductPrice:ProductPrice,  ProductAvailable:ProductAvailable,ProductDesc:ProductDesc,username:username})
  CartData.save()
  .then(function(result){
      res.status(201).json({success:true})
  })
  .catch(function(e){
      res.status(500).json({message:e})
  })
}) 

//get data
router.get('/cart/all', function(req,res){
    Cart.find()
    .then(function(CartData){
        res.status(200).json({success:true, data:CartData})
    })
    .catch(function(e){
        res.status(500).json({message:e})
    })
})

router.get('/cart',auth.verifyConsumer, function(req, res){
    const username=res.ConsumerData.username;
    Cart.find({username:username})
    .then(function(data){
        res.status(200).json({
            success:true, 
             data:data
        })
    })
    
})



module.exports = router