import express from 'express'

const app = express()

const server = app.get('/', (req, res) => {
    res.send("Hello World")
})

server.listen(3000, () => {
    console.log("Listening at 3000")
})