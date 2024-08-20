import mongoose from "mongoose";

let dataModal = new mongoose.Schema(
    {
        amount:{
            type:Number,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:false, 
        },
        date:{
            type:String,
            required:true
        },
        userId:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)
let Data = mongoose.model("Data", dataModal);

export default Data;