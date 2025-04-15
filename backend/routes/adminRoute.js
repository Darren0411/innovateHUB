import express from "express";
import User from "../models/user.js";
import Project from "../models/project.js";
import handlePendingProjects from "../controllers/admin.js";
import Feedback from "../models/feedback.js";

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

  //send a feedback to student along with approving and rejecting of projects
  router.patch("/projects/:action/:projectId",async (req, res) => {
    const { action, projectId } = req.params;
    const { feedback } = req.body;
  
    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }
  
    try {
      // Verify project exists
      const project = await Project.findById(projectId).populate('creator');
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      // Create feedback document with sender info
      await Feedback.create({
        user: project.creator._id,
        sender: req.user.userId, 
        project: project._id,
        message: feedback,
        read: false
      });

      // Update project status
      project.status = action === "approve" ? "Approved" : "Rejected";
      project.updatedAt = new Date();
      await project.save();

      res.status(200).json({ 
        message: `Project ${action}d successfully`,
        status: project.status
      });
    } catch (error) {
      console.error("Project status update error:", error);
      res.status(500).json({ 
        message: "Server error",
        error: error.message 
      });
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