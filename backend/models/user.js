import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "faculty", "admin", "viewer", "management"],
      default: "student",
    },
    profile: { type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }, // URL for profile picture
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;

