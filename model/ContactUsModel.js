const mongoose = require('mongoose')
const Contact = mongoose.model('Contact',{
    fullname:{
        type: String, 
        required: true  
    },

    email:{
        type: String,
        required : true
       
    },
    phone:{
        type: String,
        required : true  
    },
    message:{
        type: String,
        required : true  
    }
   

})

module.exports = Contact