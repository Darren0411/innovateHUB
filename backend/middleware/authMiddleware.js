import jwt from "jsonwebtoken";
 const SECRET= "$darrendsa123";

function checkForAuthentication(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        req.user = null;
        return res.status(401).json({ message: "Please Log in" });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded; // decoded token contains user id, role, etc.
        next();
    } catch (err) {
        console.error("Token verification failed:", err.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

function restrictTo(allowedRoles = []) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: `Only ${req.user.role} can access this route` });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }

        next();
    };
}

export { checkForAuthentication, restrictTo };