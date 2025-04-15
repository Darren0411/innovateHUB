import express from "express";
import multer from 'multer';
import User from "../models/user.js";
import Feedback from "../models/feedback.js";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  mapToSDG,
  linkGitHub,
  getFeedbackNotifications,
  getPortfolio,
  getaProject,
  handleMarkasRead
} from "../controllers/student.js";


const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/projects'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// Project management with file upload support
router.post("/projects",upload.single('projectImage'),createProject);


// Fetch the student details
router.get("/profile", async (req, res) => {
  const student = await User.findById(req.user.userId);
  res.json(student);
});

// Logout user
router.get("/logout", (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
  });
  return res.status(200).json({ message: 'Logout successful' });
});

// Fetch all projects created by a particular student
router.get("/projects", getProjects);
router.get("/projects/:id", getProjectById);


//fetch a particular project
router.get("/projects/:id",getaProject)

// Update a project
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

// SDG Mapping
router.put("/projects/:id/sdg", mapToSDG);

// GitHub Integration
router.post("/projects/:id/github", linkGitHub);

// Feedback Notifications
router.get("/feedback",getFeedbackNotifications);

//mark as read
router.patch("/feedback/:feedbackId/read",handleMarkasRead);


// Portfolio
router.get("/portfolio", getPortfolio);


export default router;