const express = require('express')
const app = express()
const router = require('./router')

const mongoose = require('mongoose')

app.disable('x-powered-by')
app.use(express.json())
app.use(router)


const start =  async () => {
    try {
        await mongoose.connect('')
            .then(() => console.log('connection is ready'))
        app.listen(5000, 'localhost', () => {
            console.log('Denzel\'s server listening 5000 port')
        })
    } catch (e) {
        console.log(e)
    }
}

start()