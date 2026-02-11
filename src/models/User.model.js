import mongoose from "mongoose"
import bcrypt from "bcrypt"
import {generateToken} from "./utils/jwt.js";

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true,
        minlength:3,
        maxlength:20,
        match: /^[a-z0-9_]+$/
    },
    password:{
        type : String,
        required:true,
        minlength:6,
        maxlength: 100

    },
    email:{
        type: String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
         match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    role:{
        type: String,
        enum:['student','instructor','admin'],
        default:'student',
        required:true
    },
    isVerified:{
        type: String,
        default :false

    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    loggedIn:{
        type: Boolean,
        default:false
    }


},{
    timestamps:true
    
});
// Hash password before saving 
userSchema.pre("save",async function(){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);

    }
    next();
});

user.Schema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);

    
};


user.Schema.methods.generateAuthToken=function(){
    const payload={
        id:this._id,
        username:this.username,
        email:this.email,
        role:this.role
 
    };
    return this.generateToken(payload,'7d');
};

user.Schema.methods.generatePasswordResetToken=function(){
    const restToken=generateToken({id:this._id},'1h');
    this.resetPasswordToken=bcrypt.hashSync(this.resetPasswordToken,10);
    this.resetPasswordExpire=Date.now() + 3600000;

    return this.resetPasswordToken;
}
export const User= mongoose.model('User', userSchema);
