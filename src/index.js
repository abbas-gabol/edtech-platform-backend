import dotenv from "dotenv";
import mongoose, { connect } from "mongoose";
import connectDB from "./config/database.js"
import app from "./app.js"

dotenv.config({
    path: "./.env"

})

const startserver = async()=>{
    try{
        await connectDB();

        app.on("error",(error)=>{
            console.log("error",error);
             throw error;
        })
        app.listen(process.env.PORT || 8000,()=>{
            console.log(`server is ruing on port: ${process.env.PORT || 8000}`);

        });


    }catch(error){
        console.error('startup failed',error);
        process.exit(1);

    }
};
startserver();