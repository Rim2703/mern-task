const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const app = express()
const route = require('./route')
const cors = require('cors');

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use("/uploads", express.static("uploads"));


mongoose.connect(process.env.URL, {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route)

app.listen(process.env.PORT, () => {
    console.log("Server Successfully Started!")
})

