import express from 'express';
import User, { IUser } from '../models/user';

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
		const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

// Create new user
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
		const err = error as Error;
        res.status(400).json({ message: err.message });
    }
});

// Additional routes for UPDATE and DELETE can be added similarly...

export default router;
