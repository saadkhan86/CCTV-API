import express from "express"
import { connectionController } from "../controller/connectionController.js"
export const connectionRouter = express()
connectionRouter.post("/", connectionController.create)
connectionRouter.patch("/:connectionId", connectionController.update)