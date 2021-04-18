const mongoose = require("mongoose");
const Product = mongoose.model('Product',{
    ProductName:{
        type:String

    },
    ProductImage:{
        type:String
    },
    ProductPrice:{
        type:String
    },
    ProductDesc:{
        type:String
    },
    ProductAvailable:{
        type:String
    },
    ProductRating:{
        type:String
    },
ProductType:{
    type:String
}
})

module.exports = Product