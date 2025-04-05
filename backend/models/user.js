import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['student', 'faculty', 'admin'],
   default:"student",
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
    required: true
  },
  ProfileUrl:{
    type:String,
    default:'/uploads/images/default.png'
},
 teacherDetails: { 
    licenseNumber: String, 
    instituteName: String,
    department: String 
},

},
{timestamps:true}
);

const User = mongoose.model("user", userSchema);
export default User;

