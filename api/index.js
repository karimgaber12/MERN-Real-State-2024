import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';

dotenv.config()

mongoose.connect(process.env.MONGODB).then(()=>{
    console.log("connect to MongoDB")
}).catch( (err)=>{console.log(err)});

const app = express()

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})

// req data that we get from client side
// res data that we send back from server side
app.use("/api/user", userRouter)