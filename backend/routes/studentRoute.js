import express from "express";
import User from "../models/user.js";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,deleteProject,
  mapToSDG,
  linkGitHub,
  getFeedbackNotifications,
  getPortfolio,
  getLeaderboardData
} from "../controllers/student.js";

const router = express.Router();

// Project management
router.post("/projects", createProject); //(features to add)-> 1.readme autofill as soon as user enters github link   2. send request to admin for project approval

//fetch the student details
router.get("/profile", async (req, res) => {
  const student = await User.findById(req.user.userId); // or appropriate logic
  res.json(student);
});

//logout user
router.get("/logout",(req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
  });
  return res.status(200).json({ message: 'Logout successful' });
});

//fetch all the projects created by a particular student
router.get("/projects",getProjects);
router.get("/projects/:id", getProjectById);


router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);





// SDG Mapping
router.put("/projects/:id/sdg", mapToSDG);

// GitHub Integration
router.post("/projects/:id/github", linkGitHub);

// Feedback Notifications
router.get("/notifications", getFeedbackNotifications);

// Portfolio
router.get("/portfolio", getPortfolio);

// Leaderboard
router.get("/leaderboard", getLeaderboardData);

export default router;
