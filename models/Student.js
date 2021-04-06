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
    cell:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    inClass:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    fees:[{
        month:{
            type:String,
            default:""
        },
        fee:{
            type:Number,
            default:0
        },
        remaining:{
            type:Number,
            default:false
        },
        status:{
            type:String,
            default:false
        }
    }],
    rollNumber:{
        type:Number,
        required:true
    },
    // likes:[{type:ObjectId,ref:"User"}],
    // comments:[{
    //     text:String,
    //     postedBy:{type:ObjectId,ref:"User"}
    // }],
    postedBy:{
       type:ObjectId,
       ref:"User"
    }
},{timestamps:true})

mongoose.model("Students",postSchema)