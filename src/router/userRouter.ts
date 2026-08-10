import express from "express"
import userRepo from "../repositories/userRepo.js"
import authentication from "../authentication/authentication.js"
import { userController } from "../controller/userController.js"
const userRouter = express()

userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)
userRouter.patch("/", authentication.user, userController.update)

export default userRouter