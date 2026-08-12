import express from "express"
import authentication from "../authentication/authentication.js"
import { userController } from "../controller/userController.js"
const userRouter = express()

userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)
userRouter.use(authentication.user)
userRouter.get("/", userController.get)
userRouter.patch("/", userController.update)

export default userRouter