import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();


const assignRole = (email) => {
    if (email.includes("@admin.com")) return "Admin";
    if (email.includes("@crce.faculty.in")) return "Faculty";
    if (email.includes("@crce.edu.in")) return "Student";
    return "Viewer"; // Default role
};

async function handleUserSignup(req, res) {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Assign role based on email
        const role = assignRole(email);

        // Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({ message: "User registered successfully", role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export {handleUserSignup ,handleUserLogin};