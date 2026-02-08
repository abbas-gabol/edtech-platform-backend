import mongoose from "mongoose"

const connectDB=async()=>{
    try{
        const uri=process.env.MONGODB_URI;
        if(!uri){
            throw new Error('MONGODB_URL is not set in enviroment')

        }
        const connectionIsntance = await mongoose.connect(uri);
        console.log(`MongoDB connected! ${connectionIsntance.connection.host}`);
        

    }catch(error) {
        console.error("MONGODB connection failed!",error);
        throw error;


    }
}

export default connectDB;