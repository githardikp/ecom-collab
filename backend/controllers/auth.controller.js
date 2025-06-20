import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { userZodSchema } from '../validators/user.validator.js'
import { User } from '../models/user.models.js'

export const registerUser = async (req, res) => {
    try {
        const validatedUser = userZodSchema.parse(req.body)
        const existingUser = await User.findOne({ email: validatedUser.email })
        if (existingUser) return res.status(200).json({ message: "User already exists" })

        const hashedPassword = await bcrypt.hash(validatedUser.password, 10)
        validatedUser.password = hashedPassword

        const user = await User.create(validatedUser)

        return res.status(200).json({ message: "User created", userId: user._id })
    } catch (error) {
        if (error.name === "ZodError") {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = userZodSchema.parse(req.body)
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: "Invalid Credentials" })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "Invald Credentials" })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.status(200).json({
            message: "Login Sucessfull",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                address: user.address
            }
        })
    } catch (error) {
        if (error.name === 'ZodError') {
            return res.status(400).json({ errors: error.errors })
        }

        return res.status(500).json({ message: "Login Failed", error: error.message })
    }
}