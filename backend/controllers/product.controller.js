import Product from "../models/product.models.js";

const allProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json("Error fetching the products")
    }
}


export default allProducts