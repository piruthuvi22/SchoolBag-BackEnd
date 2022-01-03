const mongoose = require("mongoose");

const streamSchema = new mongoose.Schema({
    StreamName:{
        type:String,
        required:true
    },
    SubjectName:[
        {
            type:String,
            required:true
        } 
    ],
    Grade:[
        {
            type:Number,
            required:true
        }
    ]
});

module.exports = mongoose.model("stream", streamSchema);