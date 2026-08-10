import express from "express"
import { locationController } from "../controller/locationController.js"

const locationRouter = express.Router()

locationRouter.get("/", locationController.get)
locationRouter.post("/", locationController.create)
locationRouter.patch("/", locationController.update)
locationRouter.delete("/", locationController.delete)

export default locationRouter
