import express from "express"
import { agentController } from "../controller/agentController.js"
export const agentRouter = express()
agentRouter.post("/register",agentController.register)
agentRouter.patch("/:agentId",agentController.update)