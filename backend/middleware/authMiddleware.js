import jwt from "jsonwebtoken";

function checkforAuthenticationCookie(cookieName){ 
      return (req, res, next) => {

    const token = req.cookies[cookieName];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store user data in req.user
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
}};

export default checkforAuthenticationCookie;
