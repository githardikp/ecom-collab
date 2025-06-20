import { z } from 'zod';

export const addToCartSchema = z.object({
    productId: z.string().min(1, "Product ID is required"),
    quantity: z.number().min(1).default(1)
});
