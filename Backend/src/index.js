import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env"
});


connectDB().then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log("SERVER RUNNING ON PORT :", process.env.PORT )
        
    })
}).catch((err)=>{
    console.log("Error in connecting DB" , err);
});




// One type of approach
// import mongoose from 'mongoose';
// import DB_NAME from './constants.js';
// import express from 'express';



// const app = express();

// ; (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
//         app.on('error', (err) => {
//             console.log(err);
//             throw err;
//         })

//         app.listen(process.env.PORT , ()=>{
//             console.log(`Server is running on port ${process.env.PORT}`);
//         })
//     }

//     catch (err) {
//         console.log("Error : ", err);
//         throw err;
//     }
// })()