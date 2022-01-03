const mongoose = require('mongoose')


const instituteSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    logo:{
        type:Object,
    }
})

module.exports = mongoose.model('Institute',instituteSchema)