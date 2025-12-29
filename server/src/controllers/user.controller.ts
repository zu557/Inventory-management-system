import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
// Assuming your prismaClient.js uses a default export and you have the Prisma Client type definitions
import prisma from '../prismaClient.js';
// Assuming your Prisma User model has a shape you can import or define locally, e.g., for better type safety
// import { User } from '@prisma/client'; 
// For simplicity in this example, we'll use 'any' where a type might be complex or missing.
import { Request, Response } from 'express'; // Import types from express

/**
 * Creates a new user with a hashed password.
 */
export const createUser = async (req: Request, res: Response): Promise<void> => {
    // Destructure properties from the request body, adding type assertion if you are sure of the structure
    const { username, password, email,role } = req.body as { username?: string, password?: string, email?: string ,role?: string };

    if (!username || !password || !email) {
        res.status(400).json({ msg: "Missing required fields: username, password, and email." });
        return;
    }

    try {
        // FIX: bcrypt.hash is an asynchronous function and must be awaited.
        // The second argument '12' is the salt rounds.
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword, 
                role

            }
        });

        // Optionally create and return a token here, as the original code suggested:
        // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '24h' });
        // res.json({ token });

        res.status(201).json({ msg: "User created successfully", userId: user.id }); // Use 201 for creation
    } catch (err: any) {
        console.error(err.message);
        // Handle common errors like unique constraint violation (e.g., username or email already exists)
        if (err.code === 'P2002') {
            res.status(409).json({ msg: "User with this email or username already exists." });
        } else {
            res.status(500).json({ msg: "Internal Server Error" }); // Use 500 for general errors
        }
    }
}

/**
 * Retrieves all users.
 */
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        // Explicitly type the result array for better type safety if possible (e.g., User[])
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Could not retrieve users" });
    }
};

/**
 * Retrieves a single user by ID.
 */
export const getUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // ID is a string from URL parameters

    try {
        const user = await prisma.user.findUnique({
            // Assuming ID is a string that matches the Prisma model's ID type (often a CUID or UUID string)
            where: { id: id }, 
        });

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Could not retrieve user" });
    }
};

/**
 * Updates a user by ID.
 */
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updateData = req.body; // Update data from the body

    try {
        const user = await prisma.user.update({
            where: { id: id },
            data: updateData,
        });
        res.json(user);
    } catch (err: any) {
        console.error(err.message);
        if (err.code === 'P2025') { // Prisma error code for record not found
            res.status(404).json({ msg: "User not found for update" });
        } else {
            res.status(500).json({ msg: "Could not update user" });
        }
    }
};

/**
 * Deletes a user by ID.
 */
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        await prisma.user.delete({ where: { id: id } });
        res.json({ message: "User deleted successfully" });
    } catch (err: any) {
        console.error(err.message);
        if (err.code === 'P2025') { // Prisma error code for record not found
            res.status(404).json({ message: "User not found for deletion" });
        } else {
            res.status(500).json({ message: "Could not delete user" });
        }
    }
};