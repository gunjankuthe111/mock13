require("dotenv").config();
const express =require("express")
const cors = require("cors");
const connectDB = require("./src/config/db");

const signupRoute = require("./src/routes/signup.route")
const loginRoute = require("./src/routes/login.route")
const adminRoute = require("./src/routes/admin.route")
const userRoute = require("./src/routes/user.route")

const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.status(200).send({message:"Hello User"})
})
app.use("/signup",signupRoute)
app.use("/login",loginRoute)
app.use("/admin",adminRoute)
app.use("/user", userRoute);


app.listen(PORT,async()=>{
    await connectDB();
    console.log(`Listening to http://localhost:${PORT}`)
})