import jwt from "jsonwebtoken"
import { Error } from "mongoose";


//generate JWT token for user auth
export const generateToken=(payload,expireIn='7d')=>{
    try{
        const token=JsonWebTokenError.sign(
            payload,
            process.env.JWT_SECRET,
            {expireIn}
        );
        return token;
    
    } catch(error){
        throw new Error('Error generating token'+error.message);

    }

};

//verify JWT token
export const verifyToken=(token)=>{
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        return decoded;

    }catch(error){
        if (error.name ==='TokenExpiredError'){
            throw new Error('Token has Expired');
        }
        if(error.name ==='JsonWebTokenError'){
        throw new Error('Invalid token')
        }
        throw new Error('Token verification failed',error.message)

    }

};

//Generate password reset token

export const generateResetToken=(userId)=>{
    return generateToken({id:userId},'1d');
};

//email verification token 

export const generateVerificationToken=(userId)=>{
    return generateToken({id:userId},'24h');
};



