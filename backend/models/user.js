import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
      default: 'student',
    },
    name: {
      type: String,
      required: false,
    },
    rollNo: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    ProfileUrl: {
      type: String,
      default: '/uploads/images/default.png',
    },

    // Faculty-specific details
    teacherDetails: {
      licenseNumber: String,
      instituteName: String,
      department: String,
    },

    // Student-specific fields
    skills: {
      type: [String], // array of skills
      default: [],
    },
    githubUrl: {
      type: String,
      default: '',
    },
    linkedinUrl: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('user', userSchema);
export default User;
