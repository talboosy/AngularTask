const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const dataRouter = require('./routers/data')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/auth', userRouter)
app.use(dataRouter)



app.listen(port, () => {
    console.log('Server is up on port ', +port)
})

