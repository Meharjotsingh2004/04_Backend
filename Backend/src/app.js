import express from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser'


export const app =  express();


app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true 
}));

app.use(express.json({
    limit : "16kb"
}))
app.use(express.urlencoded({
    extended : true , limit : "16kb"
}))
app.use(express.static("public"));

app.use(cookieparser());

// Root route
app.get("/", (req, res) => {
    res.send("Hello world");
});

// Routes export 
import userRouter  from './routes/user.routes.js';


//routes
app.use("/api/v1/users" , userRouter);
//https://api/v1/users/register




