import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import missingRouter from "./routes/missingRoute.js";
import messageRouter from "./routes/messageRoute.js";
import foundRouter from "./routes/foundRoute.js";
import adminRouter from "./routes/adminRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Routes
app.get("/", (req, res) => {
  res.send("🙂🙂🙂🙂");
});

app.use("/api/user", userRouter);
app.use("/api/missing", missingRouter);
app.use("/api/message", messageRouter);
app.use("/api/found", foundRouter);
app.use("/api/mf/admin", adminRouter);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});