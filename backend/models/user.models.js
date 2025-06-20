import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
});

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
    },
});

const Address = mongoose.model("Address", addressSchema);
const User = mongoose.model("User", userSchema);

export { Address, User };
