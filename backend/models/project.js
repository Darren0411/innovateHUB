import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    readMe: { type: String, required: true },

    githubRepoUrl: { type: String, required: true },

    deployedUrl: { type: String, default: "" }, // Optional

    projectImage: { type: String, required: true }, // Single project image URL (required)

    sdgMapping: [String], // Example: ['Quality Education', 'Clean Energy']

    techStack: {
      type: [String], // Array of technologies used
      default: []     // Not required
    },

    category: {
      type: String,   // Project category (e.g., "Web Development", "Game", "Animation")
      default: ""     // Not required
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending", // Default to pending until approved by admin
    },

    likes: {
      type: Number,
      default: 0,
    },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    feedback: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feedback",
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);
export default Project;