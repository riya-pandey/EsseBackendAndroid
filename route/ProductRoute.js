const express = require('express')
const router = express.Router()
const Product = require('../model/ProductModel')
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')

//inserting our product
router.post('/product/insert',upload.single('ProductImage'), function(req, res){
    console.log(req.file)
    if(req.file==undefined){
        return res.status(400).json({message:"Invalid field format"})
    }
  const ProductName = req.body.ProductName
  const ProductImage= req.body.ProductImage
  const ProductPrice = req.body.ProductPrice
  const ProductDesc = req.body.ProductDesc
  const ProductAvailable = req.body.ProductAvailable
  const ProductRating = req.body.ProductRating
  const ProductType = req.body.ProductType
 
  //{variable:modelname}
  const ProductData = new Product({ProductName:ProductName, ProductImage:req.file.filename, ProductPrice:ProductPrice, ProductDesc:ProductDesc, ProductAvailable:ProductAvailable, ProductRating:ProductRating, ProductType:ProductType})
    ProductData.save()
  
  .then(function(result){
      res.status(201).json({success:true,message: "Product has been successfully inserted!!!"})
  })
  .catch(function(e){
      res.status(500).json({message:e})
  })
}) 

router.put('/product/update',function(req,res){
    //id and update garena data
    const id = req.body.id;
    const ProductName = req.body.ProductName
    // const ProductImage= req.file.filename
    const ProductPrice = req.body.ProductPrice
    const ProductDesc = req.body.ProductDesc
    const ProductAvailable = req.body.ProductAvailable
    const ProductRating = req.body.ProductRating
    const ProductType = req.body.ProductType

    Product.updateOne({_id:id},{ProductName:ProductName, ProductPrice:ProductPrice, ProductDesc:ProductDesc, ProductAvailable:ProductAvailable, ProductRating:ProductRating, ProductType:ProductType})
    
    .then(function(result){
        res.status(200).json({message: "Product has been successfully updated!!!"})
    })
    .catch(function(e){
        res.status(500).json({message:e})
    })
})

// read
    router.get('/product/all', function(req,res){
        Product.find()
        .then(function(ProductData){
        
            res.status(200).json({success:true, data:ProductData})
        })
        .catch(function(e){
            res.status(500).json({message:e})
        })
    })
router.get('/product/all/:ProductType', function(req,res){
    const ProductType=req.params.ProductType    
    Product.find({ProductType:ProductType})
    .then(function(ProductData){
        res.status(200).json({success:true,alldata:ProductData})
    })
    .catch(function(e){
        res.status(500).json({message:e})
    })
})
router.get('/product/single/:id', function(req,res){
    const pid = req.params.id;
    Product.findOne({_id:pid})
    .then(function(ProductData){
        res.status(200).json(ProductData)
    })
    .catch(function(e){
        res.status(500).json({message:e})
    })
})

router.delete('/product/delete/:pid', function(req,res){
    const pid = req.params.pid;
    Product.deleteOne({_id:pid})
    .then(function(result){
        res.status(200).json({message: "Product Deleted Successfully!!!!", status:"true"})
    })
    .catch(function(e){
            res.status(500).json({message:e, status:"false"})
        })
    
})
module.exports = router