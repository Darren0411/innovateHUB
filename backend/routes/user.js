import express from "express";
import  {handleUserSignup ,handleUserLogin} from "../controllers/user.js";

const router = express.Router();


//signup
router.get("/user/signup", async (req, res) => {
  res.send("Signup page");
});
router.post("/user/signup",handleUserSignup);



//login
router.get("/user/login", async (req, res) => {
  res.send("Login page");
});
router.get("/user/login",handleUserLogin);


export default router;