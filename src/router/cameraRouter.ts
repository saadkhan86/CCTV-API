import express from "express"
import { cameraController } from "../controller/cameraController.js"
export const cameraRouter = express()

cameraRouter.post("/register", cameraController.create)
cameraRouter.patch("/:cameraId",cameraController.update)