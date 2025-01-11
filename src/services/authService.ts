import bcrypt from 'bcrypt'
import sql from '../utils/db'

export interface User {
    id:number;
    username:string;
    password_hash:string;
    balance:number;
}

// create a new user
export const createUser = async(username: string, password: string): Promise<User> => {
    const passwordHash = await bcrypt.hash(password,10);
    const [user] = await sql<User[]>`
        INSERT INTO users (username, password_hash)
        VALUES (${username}, ${passwordHash})
        RETURNING id, username, balance
    `;
    console.log('Registering user');
    return user;
}
// get a user by name
export const getUserByUsername = async (username: string) : Promise<User> => {
    const [user] = await sql<User[]>`
    SELECT * FROM users WHERE username = ${username}
    `;
    return user || null;
}

// update user password
export const updatePassword = async (userId: number, newPassword: string): Promise<void> => {
    const passwordHash = await bcrypt.hash(newPassword,10);
    await sql`
        UPDATE users SET password_hash = ${passwordHash} WHERE id = ${userId};`;
}