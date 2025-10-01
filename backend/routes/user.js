import express from "express";
import  {handleUserSignup ,handleUserLogin} from "../controllers/user.js";
import multer from "multer";


const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });


//signup
router.post('/signup', upload.single('profilePic'), handleUserSignup);



//login
router.post("/login",handleUserLogin);


export default router;