import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const DBConnect = async (req, res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        const connection = conn.connection.host
        console.log("----DB Connected Sucessfully----", connection)
    }
    catch (error) {
        console.log("Error connecting database", error)
    }
}

export default DBConnect