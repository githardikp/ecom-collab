import express from 'express'
import DBConnect from './config/db.js'
import cors from 'cors'
import productsRoute from './routes/products.routes.js'
const app = express()
DBConnect()
app.use(cors())
app.use(express.json())
app.use('v1/api/products', productsRoute)


app.listen(3000, () => {
    console.log("Listening at 3000")
})