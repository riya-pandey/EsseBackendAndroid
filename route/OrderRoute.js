const express = require('express')
const router = express.Router()
const Order = require('../model/OrderModel')
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')


router.post('/user/order',auth.verifyConsumer, function(req,res){
 
    const ProductName = req.body.ProductName
    const ProductImage = req.body.ProductImage
    const ProductPrice = req.body.ProductPrice
  
    
  const username =res.ConsumerData.username
 
     const OrderData = new Order({ProductName:ProductName, ProductImage:ProductImage,ProductPrice:ProductPrice,username:username})
        OrderData.save()
        .then(function(result){
            res.status(201).json({success:true,message: "Order has been successfully inserted!!!"})
        })
        .catch(function(e){
            res.status(500).json({message:e})
        })
   
})

//handle incoming GET requests to orders
router.get('/order',(req, res, next) => {
    Order.find()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        })
    })
});

module.exports = router