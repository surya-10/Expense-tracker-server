import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { database } from "./db Connection/connect.js";
import { isAuth } from "./auth/isAuth.js";
import authrouter from "./Routers/userRouters/user.routers.js";
import dataRouter from "./Routers/DataRouters/data.router.js";
dotenv.config()
let app = express();
app.use(cors());
app.use(express.json());

app.use("/", authrouter);
app.use("/data", isAuth, dataRouter);
app.listen(process.env.port, ()=>{
    console.log("server created");
})

app.get("/", (req, res)=>{
    res.send("Hello !")
})