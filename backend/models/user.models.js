import mongoose from "mongoose";
import { z } from 'zod'

const addressSchema = mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
});

const Address = mongoose.model("Address", addressSchema);

const userSchema = mongoose.Schema({
    name: z.string().min(3, "Enter a minimum of 3 characters"),
    email: z.string().email("Envalid Email Address"),
    password: z.string().min(6, "Enter atleast 6 character password"),
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" }

})

const users = mongoose.model('User', userSchema)

export default { users, Address }