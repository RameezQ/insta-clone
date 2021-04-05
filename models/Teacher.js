const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const teacherSchema = new mongoose.Schema({
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
        type:Number,
        required:true
    },
    teacherId:{
type:Number
    },
    subject:{
        type:String
    },
    classOfTeach:{
     type:String
},
    
    photo:{
        type:String,
        required:true
    },
    idCard:{
        type:Number
    },
    education:{
   type:String
},
    salary:{
        type:Number
    },
    reference:{
        type:String
    },
    postedBy:{
       type:ObjectId,
       ref:"User"
    }
},{timestamps:true})

mongoose.model("Teachers",teacherSchema)