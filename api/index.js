import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import path from 'path';
import cors from 'cors';

import cookieParser from 'cookie-parser';

dotenv.config()

mongoose.connect(process.env.MONGODB).then(()=>{
    console.log("connect to MongoDB")
}).catch( (err)=>{console.log(err)});

const __dirname = path.resolve();

const app = express()

app.use(cors({
    origin:['https://deploy-mern-real-state-2024-fod7dsa.app'],
    methods:["POST","GET"],
    credentials:true
}))

app.use(express.json())

app.use(cookieParser())

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})

// req data that we get from client side
// res data that we send back from server side
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/listing", listingRouter)

app.use(express.static(path.join(__dirname,"/client/dist")));
app.get("*", (req,res) =>{
    res.sendFile(path.join(__dirname,"client","dist","index.html"))
})

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server Error";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})
