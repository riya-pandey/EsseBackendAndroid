const mongoose = require("mongoose");
const Cart = mongoose.model('Cart',{
    ProductName:{
        type:String
    },
    ProductImage:{
        type:String
    },
    ProductPrice:{
        type:String
    },
    ProductAvailable:{
        type:String
    },
    ProductDesc:{
        type:String
    },
    username:{
        type: String,
    }
   
})

module.exports = Cart