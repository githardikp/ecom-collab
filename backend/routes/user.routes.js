import express from 'express'
import { registerUser, loginUser } from '../controllers/auth.controller'
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/profile', protect, (req, res) => {
    res.json({
        message: "Access granted to protected route",
        user: req.user,
    });
});

export default router