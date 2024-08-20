import mongoose from "mongoose";

let userScheme = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    }
},
{timestamps:true});

let User = mongoose.model("User", userScheme);

export default User;