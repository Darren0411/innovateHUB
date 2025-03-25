import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    media: [String], // Array of image/video URLs
    sdgMapping: [String], // Array of SDG categories (e.g., "Quality Education", "Climate Action")
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ratings: { type: Number, default: 0 },
    feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema );
export default Project;
