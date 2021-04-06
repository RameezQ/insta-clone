const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const FeeSchema = new mongoose.Schema({
    fee:[{
        month:{
            type:String,
            default:""
        },
        paid:{
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
    studentId:{
       type:ObjectId,
       ref:"Students"
    }
},{timestamps:true})

mongoose.model("Fee",FeeSchema)