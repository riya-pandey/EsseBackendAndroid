const mongoose = require("mongoose");
const Order = mongoose.model('Order',{
    ProductName:{
        type:String

    },
    ProductImage:{
        type:String
    },
    ProductPrice:{
        type:String
    },

})

module.exports = Order