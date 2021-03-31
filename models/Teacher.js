const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    fatherName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    cell:{
        type:String,
        required:true
    },
    course:{
        type:String
    },
    class:{
      type:String
    },
    
    photo:{
        type:String,
        required:true
    },
    idCard:{
        type:String
    },
    postedBy:{
       type:ObjectId,
       ref:"User"
    }
},{timestamps:true})

mongoose.model("Teachers",postSchema)