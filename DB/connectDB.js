const mongoose = require('mongoose');


const connectDB = async()=>{
    return await mongoose.connect(process.env.MongoATLSCONNECTIONSTRING).then((result)=>{
        console.log("connected");
    }).catch((err)=>{
        console.log("connection error");
    })
}

module.exports = connectDB