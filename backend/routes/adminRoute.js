import express from "express";
import User from "../models/user.js";
import Project from "../models/project.js";
import handlePendingProjects from "../controllers/admin.js";

const router = express.Router();


// Fetch the admin details
router.get("/profile", async (req, res) => {
    const admin = await User.findById(req.user.userId);
    res.json(admin);
  });

//fetch all users and their respective projects 
router.get("/dashboard",async(req,res)=>{
    const projects = await Project.find({}).populate("creator");
    res.json(projects);
})

//fetch all the pending projects 
router.get("/pending-projects",handlePendingProjects)

//approve projects
router.patch('/projects/approve/:id', async (req, res) => {
    try {
      const project = await Project.findByIdAndUpdate(req.params.id, { status: 'Approved' }, { new: true });
      res.status(200).json(project);
    } catch (err) {
      res.status(500).json({ message: 'Failed to approve project.' });
    }
  });

//Reject project
router.patch('/projects/reject/:id', async (req, res) => {
    try {
      const project = await Project.findByIdAndUpdate(req.params.id, { status: 'Rejected' }, { new: true });
      res.status(200).json(project);
    } catch (err) {
      res.status(500).json({ message: 'Failed to approve project.' });
    }
  });

  //delete a user
  router.delete("/delete/:id",async(req,res)=>{
    try {
        await Project.deleteMany({ creator: req.params.id });
        await User.findByIdAndDelete(req.params.id);
        
        res.status(200).json({ message: "User and their projects deleted successfully" });
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({ message: "failed to delete the user" });
    }
  });
  

  // Logout admin
router.get("/logout", (req, res) => {
    res.clearCookie('token', {
      httpOnly: true,
    });
    return res.status(200).json({ message: 'Logout successful' });
  });

  export default router;