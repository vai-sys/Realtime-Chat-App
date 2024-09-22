

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(403).json({ message: "Access Denied: No Token Provided" });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid Token" });
        }

        req.user = decoded;
        next();
    });
};
