import {Request, Response} from 'express';
import { purchaseProduct } from '../services/productService';

export const buyProduct = async (req: Request, res: Response):Promise<any> => {
    const { userId, productId } = req.body;

    // Corrected condition to check if either userId or productId is missing
    if (!userId || !productId) {
        return res.status(400).json({ message: 'User ID and Product ID are required' });
    }

    try {
        // Call the purchaseProduct function to handle the logic
        const result = await purchaseProduct(userId, productId);

        // Respond with the new balance
        res.status(200).json({
            message: 'Purchase successful',
            balance: result.balance,
        });
    } catch (error) {
        // Improved error handling for better formatting
        console.error('Error purchasing product:', error);
        res.status(400).json({
            message: 'Failed to purchase product',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};