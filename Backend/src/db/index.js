import express from 'express';
import { DB_NAME } from '../constants.js';
import mongoose from 'mongoose';


const connectDB = async()=>{
    try {

        

        const connectInstance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);

        console.log(`\n MONGO DB CONNECTED !! DB HOST: ${connectInstance.connection.host}`);
    } catch (error) {
        console.log("MONGO DB ERROR" , error);
        process.exit(1);

    }
}


export default connectDB;

 