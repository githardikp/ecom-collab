import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import DBConnect from './config/db.js';

import productsRoute from './routes/product.routes.js';
import authRoute from './routes/user.routes.js';
import cartRoute from './routes/cart.routes.js';
// import checkoutRoute from './routes/checkoutRoutes.js';
// import stripeWebhookRoute from './routes/stripeWebhook.js';

dotenv.config();
const app = express();
DBConnect();

app.use(cors());
app.use(express.json());
// Stripe Webhook (must come before express.json)
// app.use('/api/stripe', stripeWebhookRoute); // raw body parser used in that route

app.use('/v1/api/products', productsRoute);
app.use('/v1/api/auth', authRoute);
app.use('/v1/api/cart', cartRoute);
// app.use('/v1/api/checkout', checkoutRoute);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
