import { Request, Response } from "express";
import { createUser, getUserByUsername, updatePassword } from "../services/authService";
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    console.log('Trying to register');
    if (!username || !password) {
        res.status(400).json({
            message: 'Username and password are required'
        });
    }

    // if username exists
    try {
        const existingUser = await getUserByUsername(username);
        if (existingUser) {
            res.status(400).json({ message: 'Username exists' });
        }

        const user = await createUser(username, password);
        res.status(201).json({ id: user.id, username: user.username, balance: user.balance });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const {username, password} = req.body;
    if(!username || !password) {
        res.status(400).json({message: 'Username and password are required'})
    }

    try{
        const user = await getUserByUsername(username);
        if(!user){
            res.status(400).json({message: 'Invalid credentials'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if(!isPasswordValid){
            res.status(400).json({message: 'Invalid credentials'});
        }
        res.status(200).json({id:user.id, username: user.username, balance:user.balance});
    } catch(error){
        res.status(500).json({message: 'Error during login', error});
    }
};

export const changePassword = async (req: Request, res: Response): Promise<void> => {
    const {userId, currentPassword, newPassword} = req.body;
    if(!userId || !currentPassword || !newPassword){
        res.status(400).json({message: 'UserId, current password, and new password are required'});
    }

    try {
        const user = await getUserByUsername(req.body.username);
        if (!user){
            res.status(404).json({message: 'User not found'});
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
        if(!isPasswordValid){
            res.status(400).json({message: 'Current password is incorrect'});
        }

        // password updated successfully
        await updatePassword(user.id, newPassword);
        res.status(200).json({message: 'Password updated successfully'});
    } catch(error){
        res.status(500).json({message: 'Error updating password', error});
    }
}