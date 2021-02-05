const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb+srv://talboosy:tb123qwe@cluster0.0ioyq.mongodb.net/db?retryWrites=true&w=majority'


mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
})

mongoose.connection.on('connected', () => {
    console.log('mongoose connected')
})


