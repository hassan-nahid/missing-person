import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET; // Your secret key from environment variables

export const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Attach user information to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle token verification errors
        return res.status(403).json({ message: "Forbidden: Invalid or expired token", error: error.message });
    }
};
