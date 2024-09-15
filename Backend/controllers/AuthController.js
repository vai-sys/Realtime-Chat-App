import User from "../models/userModel.js"; 
import jwt from "jsonwebtoken"; 
import bcrypt from "bcryptjs";

const maxAge = 3 * 24 * 60 * 60;

const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge });
};

export const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        
        const user = await User.create({ email, password: hashedPassword });

        
        res.cookie("jwt", createToken(email, user.id), {
            httpOnly: true,
            maxAge: maxAge * 1000, 
            secure: true,
            sameSite: "None",
        });

        
        return res.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                profileSetup: user.profileSetup,
            },
        });
    } catch (err) {
        console.error("Signup Error: ", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

    
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        
        res.cookie("jwt", createToken(email, user.id), {
            httpOnly: true,
            maxAge: maxAge * 1000, 
            secure: true,
            sameSite: "None",
        });

        
        return res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                profileSetup: user.profileSetup,
            },
        });
    } catch (err) {
        console.error("Login Error: ", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
