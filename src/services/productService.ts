// task 3 - purchase simulation

import sql from '../utils/db';

export interface Purchase {
    id: number;
    user_id: number;
    product_id: number;
    purchase_at: string;
}

// find a user
const getUserById = async (userId: number): Promise<{id: number; balance:number} | null> => {
    try {
        // Execute the query and retrieve the rows
        const result = await sql<{ id: number; balance: number }[]>`
            SELECT id, balance 
            FROM users 
            WHERE id = ${userId}
        `;

        // Return the first row if it exists, otherwise return null
        return result.length > 0 ? result[0] : null;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

// find a product
const getProductById = async (productId: number): Promise<{id: number; price: number} | null> => {
    try {
        // Execute the query and retrieve the rows
        const result = await sql<{ id: number; price: number }[]>`
            SELECT id, price 
            FROM products 
            WHERE id = ${productId}
        `;

        // Return the first row if it exists, otherwise return null
        return result.length > 0 ? result[0] : null;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
}

export const purchaseProduct = async (userId: number, productId: number): Promise<{balance: number}> => {
    const user= await getUserById(userId);
    const product = await getProductById(productId);

    if(!user){
        throw new Error('User not found');
    }

    if(!product){
        throw new Error('Product not found');
    }

    if(user.balance < product.price){
        throw new Error('Not enough money');
    }

    const newBalance = user.balance - product.price;
    await sql`UPDATE users SET balance = ${newBalance} WHERE id = ${userId}`;

    return {balance: newBalance};
}