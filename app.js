const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const path = require('path');
const PORT = process.env.PORT || 8000
const {MONGOURI} = require('./config/keys')


mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify:false

})
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})
require('./models/user')
require('./models/Student')
require('./models/Teacher')
require('./models/MarksSheet')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/Student'))
app.use(require('./routes/user'))
app.use(require('./routes/Teacher'))
app.use(require('./routes/MarkSheets'))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})

