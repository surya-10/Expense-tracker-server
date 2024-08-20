import express from "express";
import { createData, deleteData, editData, getData } from "../../controllers/datacontroller/data.controller.js";

let dataRouter = express.Router();


dataRouter.post("/add", createData)
dataRouter.put("/edit/:id", editData)
dataRouter.delete("/delete/:id", deleteData)
dataRouter.get("/all/:id", getData)
export default dataRouter;