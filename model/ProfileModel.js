const mongoose = require('mongoose')
const Profile = mongoose.model('Profile',{
    username:{
        type: String
        
    },

    email:{
        type:String
    },
    Fname:{
        type:String
    },
    Lname:{
        type:String
    },
    
    address: {
        type: String
        
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
   
    contact:{
        type: Number,
      
    },
    about:{
        type: String,
   
    }
})

module.exports = Profile