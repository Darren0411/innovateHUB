import express from "express";
import User from "../models/user.js";
import Project from "../models/project.js";
import Feedback from "../models/feedback.js";

const router = express.Router();

//profile
router.get("/profile", async (req, res) => {
    const faculty = await User.findById(req.user.userId);
    res.json(faculty);
  });

// Logout user
router.get("/logout", (req, res) => {
    res.clearCookie('token', {
      httpOnly: true,
    });
    return res.status(200).json({ message: 'Logout successful' });
  });

//fetch mentored students and projects
router.get("/faculty-projects-students", async (req, res) => {

    try {
        const mentorName = req.user.name; 

        const projects = await Project.find({ mentorName: mentorName }).populate("creator");

        res.status(200).json(projects);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
});

//send feeback
router.post("/feedback/:projectId", async (req, res) => {
    try {
      const { projectId } = req.params;
      const { feedback } = req.body;
  
      // Validate feedback exists and is not empty
      if (!feedback || feedback.trim() === '') {
        return res.status(400).json({ 
          success: false,
          message: "Feedback cannot be empty" 
        });
      }
  
      const project = await Project.findById(projectId).populate('creator');
      if (!project) {
        return res.status(404).json({ 
          success: false,
          message: "Project not found" 
        });
      }
  
      // Create feedback
      const newFeedback = await Feedback.create({
        user: project.creator._id,
        sender: req.user.userId,
        project: project._id,
        message: feedback,
        read: false
      });
  
      return res.status(201).json({
        success: true,
        message: "Feedback submitted successfully",
        feedback: {
          id: newFeedback._id,
          message: newFeedback.message,
          createdAt: newFeedback.createdAt
        }
      });
  
    } catch (error) {
      console.error("Feedback submission error:", error);
      return res.status(500).json({ 
        success: false,
        message: "Failed to submit feedback",
        error: error.message 
      });
    }
  });

  router.get('/recent-feedbacks', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 3;
      const feedbacks = await Feedback.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate({
          path: 'project',
          populate: {
            path: 'creator',
            select: 'name'
          }
        })
        .populate('sender', 'name');
      
      res.json(feedbacks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get all feedbacks (for feedback page)
  router.get('/all-feedbacks', async (req, res) => {
    try {
      const feedbacks = await Feedback.find()
        .sort({ createdAt: -1 })
        .populate({
          path: 'project',
          populate: {
            path: 'creator',
            select: 'name'
          }
        })
        .populate('sender', 'name');
      
      res.json(feedbacks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });




export default router;