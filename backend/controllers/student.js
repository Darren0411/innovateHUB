import Project from '../models/project.js';
import User from '../models/user.js';
import Feedback from "../models/feedback.js";

 
async function createProject(req, res) {

  const projectImage = req.file ? req.file.path : null;

    // Validate required fields including the image
    if (!req.file) {
      return res.status(400).json({ message: "Project image is required" });
    }

  try {
    const {
      title,
      readMe,
      githubRepoUrl,
      deployedUrl = "",
      sdgMapping = [],
      techStack = [],
      category = ""
    } = req.body;


    

    // Ensure required fields
    if (!title || !readMe || !githubRepoUrl) {
      return res.status(400).json({ message: "Title, ReadMe, and GitHub Repo URL are required." });
    }

    // Create the new project document
    const project = new Project({
      title,
      readMe,
      githubRepoUrl,
      deployedUrl,
      projectImage,
      sdgMapping,
      techStack,
      category,
      creator: req.user.userId, // Assuming authentication middleware sets req.user
      status: "Pending",     // Set explicitly (optional as schema defaults)
      likes: 0,              // Default like count
      feedback: []           // Initialize empty feedback array
    });

    await project.save();

    res.status(201).json({
      message: "Project created successfully",
      project
    });

  } catch (err) {
    console.error("Project Creation Error:", err);
    res.status(500).json({ error: err.message });
  }
};

  async function getProjects (req, res) {
  const projects = await Project.find({creator: req.user.userId });
  const user = await User.findById(req.user.userId);
  res.json({ projects,user });
};

 async function getProjectById  (req, res){
  const project = await Project.findById(req.params.id);
  res.json(project);
};

  async function updateProject (req, res) {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};
  async function deleteProject (req, res) {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
};

async function mapToSDG (req, res) {
  const { sdgs } = req.body;
  const updated = await Project.findByIdAndUpdate(req.params.id, { sdgs }, { new: true });
  res.json(updated);
};

 async function  linkGitHub (req, res) {
  const { githubLink } = req.body;
  const updated = await Project.findByIdAndUpdate(req.params.id, { githubLink }, { new: true });
  res.json(updated);
};

async function getFeedbackNotifications(req, res) {
  try {
    const feedbacks = await Feedback.find({ user: req.user.userId })
      .populate({
        path: "project",
        select: "title status" 
      })
      .populate("sender", "name") 
      .sort({ createdAt: -1 });

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ 
      message: "Error fetching feedback",
      error: error.message 
    });
  }
}


 async function getPortfolio (req, res) {
  const projects = await Project.find({ creator: req.user._id });
  res.json({ portfolio: projects });
};

async  function getLeaderboardData(req, res)  {
const leaderboard = await Project.find()
    .sort({ rating: -1, views: -1 })
    .limit(10);
  res.json(leaderboard);
};

async function getaProject(req,res) {
  const project = await Project.findById(req.params.id);
  res.json(project);
}
 
async function handleMarkasRead(req,res) {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.feedbackId,
      { read: true },
      { new: true }
    );
    
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Error marking feedback as read" });
  }
}

export  {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  mapToSDG,
  linkGitHub,
  getFeedbackNotifications,
  getPortfolio,
  getLeaderboardData,
  getaProject,
  handleMarkasRead
};
