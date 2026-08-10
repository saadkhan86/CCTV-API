import express from "express"
import { locationController } from "../controller/locationController.js"
import authentication from "../authentication/authentication.js"

const locationRouter = express.Router()

locationRouter.use(authentication.user)
locationRouter.get("/", locationController.get)
locationRouter.post("/", locationController.create)
locationRouter.patch("/", locationController.update)
locationRouter.delete("/", locationController.delete)

export default locationRouter
