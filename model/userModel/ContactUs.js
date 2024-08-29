const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const ContactUs = new  Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require: true,
        unique:true
    },
    phoneNo:{
        type:String,
        require: true
    },
    description:{
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    isDelete:{
        type:Boolean,
        default:false
    }
    
})


module.exports =  mongoose.model('ContactUs',ContactUs);

