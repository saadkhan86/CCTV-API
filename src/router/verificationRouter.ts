import express from "express"
import verificationController from "../controller/verificationController.js"
const verificationRouter = express()
verificationRouter.get("/verify-email/:token", verificationController.verifyEmail)
verificationRouter.post("/send-verification-email", verificationController.resendVerificationEmail)

export default verificationRouter