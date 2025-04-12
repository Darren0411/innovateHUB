import mongoose from "mongoose";

const LeaderboardSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    score: { type: Number, default: 0 }, // Score based on ratings
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Leaderboard = mongoose.model("Leaderboard", LeaderboardSchema );
export default Leaderboard;