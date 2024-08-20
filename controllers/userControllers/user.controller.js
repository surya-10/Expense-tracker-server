import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../../modals/user.modal.js";

export let createUser = async(req, res)=>{
    try {
        let {name, email, password} = req.body;
        let isExist = await User.findOne({email:email});
        if(isExist){
            return res.status(400).json({response:"user already exist", ok:false});
        }
        let hashedPass = await bcrypt.hash(password, 10);
        let addtoDb = new User({
            name,
            email,
            password:hashedPass
        })
        await addtoDb.save();
        return res.status(201).json({response:"created", ok:true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({response:"server error", ok:false});
    }
}
export let loginUser = async(req, res)=>{
    try {
        let {email, password} = req.body;
        let isExist = await User.findOne({email:email});
        if(!isExist){
            return res.status(404).json({response:"user does not exist", ok:false});
        }
        let checkPass = await bcrypt.compare(password, isExist.password);
        if(!checkPass){
            return res.status(400).json({response:"username or password is incorrect", ok:false});
        }
        let token = jwt.sign({id:isExist._id}, process.env.secret_key, {expiresIn:"7d"});
        return res.status(200).json({response:"login success", ok:true, token, userId:isExist._id});
    } catch (error) {
        console.log(error);
        return res.status(500).json({response:"server error", ok:false});
    }
}

export let forgotPass = async(req, res)=>{
    let {email} = req.body;
    try {
        let isExist = await User.findOne({email:email});
        if(!isExist){
            return res.status(404).json({response:"user not found", ok:false});
        }
        let token = jwt.sign({id:isExist._id}, process.env.secret_key, {expiresIn:"20m"});
        let mailTransport = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.email,
                pass:process.env.pass
            }
        })
        let mailOption = {
            from:process.env.email,
            to:`${isExist.email}`,
            subject:"Reset password",
            html: `
            <div>
            <p>Link to reset your password</p>
            <p>This Link will expire in 20 minutes</p>
            
            <a href=https://master--my-expense-view-tracker.netlify.app/reset-password/${isExist._id}/${token} style="display: inline-block; background-color: blue; color: white; padding: 10px 20px; text-align: center; text-decoration: none; border-radius: 5px; cursor: pointer;">Click here </a>
        
            </div>`
        }
        mailTransport.sendMail(mailOption, (error, info)=>{
            if(error){
                return res.status(400).json({response:"email failed", ok:false});
            }
            else{
                return res.status(200).json({response:"check your email, we have sent reset password link", ok:true});
            }
        })
        
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({msg:"Server error", resp:false});
    }
}

export let verifyToken = async(req, res)=>{
    let {id, token} = req.params;
    try {
        if(!id || !token){
            return res.status(400).json({response:"invalid token or id", ok:false});
        }
        let isValid = jwt.verify(token, process.env.secret_key);
        if(isValid.id==id){
            return res.status(200).json({response:"token verified", ok:true})
        }
        else {
            return res.status(400).json({ response: "Invalid token", ok: false });
        }
    } catch (error) {
        console.log("Error", error);
        return res.status(400).json({ response: "Expired or invalid token", ok: false });
    }
}
export let updatePassword = async(req, res)=>{
    try {
        let {password} = req.body;
        let {id} = req.params;
        let isExist = await User.findById(id);
        if(!isExist){
            return res.status(404).json({response:"user does not exist", ok:false});
        }
        let hashedPass = await bcrypt.hash(password, 10);
        let updatePass = await User.findByIdAndUpdate(id, {password:hashedPass});
        if(!updatePass){
            return res.status(400).json({response:"error to update your password, try later", ok:false});
        }
        else{
            return res.status(201).json({response:"updated", ok:true});
        }
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({msg:"Server error", resp:false});
    }
}

export let findAllUsers = async(req, res)=>{
    try {
        let users = await User.find({}, {email:1, firstName:1, lastName:1, mobile:1, role:1});
        return res.status(200).json({response:"success", ok:true, data:users});
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({msg:"Server error", resp:false});
    }
}