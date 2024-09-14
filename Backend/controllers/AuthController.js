import User from "../models/userModel";
import jwt from "jsonwebtoken"; 
import bcrypt from "bcryptjs";  
const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge });
};

export const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({ email, password: hashedPassword });

        res.cookie("jwt", createToken(email, user.id), {
            httpOnly: true,
            maxAge: maxAge,
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
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};
