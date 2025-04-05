import express from "express";
import  connectMongodb from "./utils/connection.js";
import userRoute from "./routes/user.js";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();
const PORT = 9000;
connectMongodb("mongodb://localhost:27017/innovateHUB")
.then((e)=>console.log("mongodb connected"));


app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5174', //frontend URL
    credentials: true, // Allows cookies to be sent
  })
);
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static('uploads'));


// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Credentials", "true");
// });

 

app.use("/user", userRoute);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
  