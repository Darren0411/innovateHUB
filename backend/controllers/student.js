import Project from '../models/project.js';
import User from '../models/user.js';
import Feedback from "../models/feedback.js";

 
async function createProject(req, res) {
  console.log("reqbody:",req.body);

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
    console.log("projectImage:",projectImage);

    

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

 async function getFeedbackNotifications (req, res) {
  const feedback = await Feedback.find({ toUser: req.user._id });
  res.json(feedback);
};

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
  console.log("project:",project)
  res.json(project);
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
  getaProject
};
