import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Authorization token is missing" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the role is admin
        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        // Optional: Match the admin email (decoded email) with a provided email in the request
        const { email } = req.body; // Assuming email is sent in the request body
        if (email && decoded.email !== email) {
            return res.status(403).json({ message: "Email mismatch. Unauthorized access." });
        }

        // Attach admin info to the request object
        req.admin = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
