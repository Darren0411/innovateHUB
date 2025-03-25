import express from "express";
import  connectMongodb from "./utils/connection.js";
import userRoutes from "./routes/user.js";

const app = express();
const PORT = 9000;
connectMongodb("mongodb://localhost:27017/innovateHUB")
.then((e)=>console.log("mongodb connected"));


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", async(req, res) => {
   res.send("Hello World");
 });  

app.use("/user", userRoutes);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
  