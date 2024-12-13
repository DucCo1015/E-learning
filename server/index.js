import express from 'express'
import dotenv from 'dotenv'
import connectDB from './dbConnect.js'
import userRouter from './routers/userRouter.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import courseRouter from './routers/courseRouter.js'
import mediaRouter from './routers/mediaRouter.js'
dotenv.config({});

const app = express();

connectDB();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
 origin:"http://localhost:5173",
 credentials:true
}));


app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/media", mediaRouter);

// app.get("/home", (_, res) => {
//  res.status(200).json({success: true, message: 'Hello I am  coming from backend '})
// })
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
 console.log(`Server listening on port:${PORT} `)
})