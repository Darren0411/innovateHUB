import express from "express";

const app = express();
const PORT = 9000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.get("/", async(req, res) => {
   res.send("Hello World");
    });  

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
  