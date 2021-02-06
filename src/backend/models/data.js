const mongoose = require('mongoose')
const validator = require('validator')

const Data = mongoose.model('Data', {
    procedure: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
    },
    value:{
        type: Number
    }
})

module.exports = Data