const express = require('express')
const cors = require('cors')
const app = express()
const userRoutes = require('./routes/users')
const apiRoutes = require('./routes/api')

const connectDB = require('./db')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
require("dotenv").config({ path: './.env' })
connectDB()

app.use('/api',userRoutes)
app.use('/api',apiRoutes)

app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`)
})