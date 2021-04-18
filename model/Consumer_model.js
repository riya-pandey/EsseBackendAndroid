const mongoose = require('mongoose')
const Consumer = mongoose.model('Consumer',{
    fullname:{
        type: String, 
        required: true  
    },
    username:{
        type: String,
        required : true
    },
    
    address: {
        type: String,
        required :true
    },
   
    contact:{
        type: Number,
        required : true
        // validate: {
        //     validator: function(v) {
        //       return /\d{5}-\d{5}/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid phone number!`
        //   },
        //   required: [true, 'User phone number required']
        // },
    },
    email:{
        type: String,
        required : true
       
    },
    password: {
        type: String,
        required: true
    },
    profileimg:{
        type:String
    }

})

module.exports = Consumer