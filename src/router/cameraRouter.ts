import express from "express"
import { cameraController } from "../controller/cameraController.js"
export const cameraRouter = express()

cameraRouter.post("/:locationId/:agentId/:connectionId/register", cameraController.create)
cameraRouter.patch("/:agentId/:cameraId",cameraController.update)
cameraRouter.get("/:agentId/:cameraId",cameraController.get)