import express from "express";
import  connectMongodb from "./utils/connection.js";
import userRoute from "./routes/user.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import {checkForAuthentication,restrictTo} from "./middleware/authMiddleware.js";
import studentRoute from "./routes/studentRoute.js";
import path from "path";
import { fileURLToPath } from 'url'
import Project from "./models/project.js";
import User from "./models/user.js";


const app = express();
const PORT = 9000;
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
connectMongodb("mongodb://localhost:27017/innovateHUB")
.then((e)=>console.log("mongodb connected"));


app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173', //frontend URL
    credentials: true, // Allows cookies to be sent
  })
);
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))




// Define routes
app.use("/user", userRoute);
app.use("/student",checkForAuthentication, restrictTo(["student"]), studentRoute);

// app.use("/faculty", checkForAuthentication, restrictTo(["faculty"]), facultyRoute);
// app.use("/admin", checkForAuthentication, restrictTo(["admin"]), adminRoute);

app.get("/projects/:id",async(req,res)=>{
  const project = await Project.findById(req.params.id);
  const user = await User.findById(project.creator);
  res.json({project,user});
});

//calculate likes 
app.patch("/projects/:id/like", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to like project", error: err });
  }
});

//calculate views
app.patch('/:id/view', async (req, res) => {
  console.log("hi");
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to increment view count", error: err });
  }
});


app.get("/projects",async(req,res)=>{
  const projects = await Project.find({});
  res.json(projects);
});

//fetch the user portfolio
app.get("/portfolio/:id",async(req,res)=>{
  const user = await User.findById(req.params.id);
  const projects = await Project.find({ creator: req.params.id });
  res.json({projects,user});
});

//auth and authorization in react
app.get("/auth/me", checkForAuthentication, restrictTo(["student"]), (req, res) => {
  res.json({ user: req.user });
});


//leaderboard
app.get("/leaderboard", async (req, res) => {
  try {
    const projects = await Project.find({}).lean();
    const users = await User.find({}).lean();

    // Calculate scores
    const processedProjects = projects.map(project => ({
      ...project,
      score: (project.rating || 0) * 2 + (project.likes || 0) + (project.views || 0) * 0.1,
      change: 0
    })).sort((a, b) => b.score - a.score);

    // Calculate user stats
    const userStats = {};
    projects.forEach(project => {
      if (project.createdBy) {
        if (!userStats[project.createdBy]) {
          userStats[project.createdBy] = {
            totalScore: 0,
            totalLikes: 0,
            totalViews: 0,
            projectCount: 0
          };
        }
        userStats[project.createdBy].totalScore += (project.rating || 0) * 2 + (project.likes || 0) + (project.views || 0) * 0.1;
        userStats[project.createdBy].totalLikes += project.likes || 0;
        userStats[project.createdBy].totalViews += project.views || 0;
        userStats[project.createdBy].projectCount += 1;
      }
    });

    const processedUsers = users.map(user => ({
      ...user,
      ...(userStats[user._id] || {
        totalScore: 0,
        totalLikes: 0,
        totalViews: 0,
        projectCount: 0
      })
    })).sort((a, b) => b.totalScore - a.totalScore);

    res.json({
      success: true,
      projects: processedProjects,
      users: processedUsers
    });
  } catch (error) {
    console.error("Leaderboard error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
});





app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
