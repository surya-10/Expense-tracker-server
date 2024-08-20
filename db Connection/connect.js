import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connecToDb(){
    try {
        let data = await mongoose.connect(process.env.conStr);
        console.log("db connected");
        return data;
    } catch (error) {
        console.log(error);
    }
    console.log("DB connecte")
}
export let database = connecToDb();