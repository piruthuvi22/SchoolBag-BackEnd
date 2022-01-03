const mongoose = require('mongoose')


const subjectSchema = new mongoose.Schema({

    subject: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Subject',subjectSchema)