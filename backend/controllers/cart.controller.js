import Cart from '../models/cart.models.js';
import Product from '../models/product.models.js';
import { addToCartSchema } from '../validators/cart.validator.js';

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = addToCartSchema.parse(req.body);

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = await Cart.create({
                user: req.user._id,
                items: [{ product: productId, quantity }],
            });
        } else {
            const itemIndex = cart.items.findIndex(
                (item) => item.product.toString() === productId
            );

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }

            await cart.save();
        }

        res.status(200).json({ message: "Product added to cart", cart });
    } catch (err) {
        if (err.name === 'ZodError') {
            return res.status(400).json({ errors: err.errors });
        }
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
