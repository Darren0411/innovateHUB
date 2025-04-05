import express from "express";
import  {handleUserSignup ,handleUserLogin} from "../controllers/user.js";
import multer from "multer";


const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });


//signup
router.get("/signup", (req, res) => {
    res.send("Signup Page");
  });
router.post('/signup', upload.single('profilePic'), handleUserSignup);



//login
router.get("/login", async (req, res) => {
  res.send("Login page");
});
router.post("/login",handleUserLogin);


export default router;