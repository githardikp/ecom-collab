import express from 'express'
import allProducts from '../controllers/product.controller.js'
const router = express.Router()

router.get('/', allProducts)

export default router