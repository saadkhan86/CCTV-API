import { Request, Response } from "express"
import userRepo from "../repositories/userRepo.js"
import { IUser } from "../interfaces/IUser.js"
import emailUtils from "../utils/emailUtils.js"
import { Types } from "mongoose"
export const userController = {
    signup: async (req: Request, res: Response) => {
        const user = await userRepo.signup(req.body as IUser.Create)
        emailUtils.sendVerificationEmail(user.email, user.emailVerificationToken as string).catch((error) => {
            console.error("something went wrong while sending verification email -> ", error)
        })
        res.status(201).json({ success: true, message: `email verification has been sent to ${user.email}` })
    }, login: async (req: Request, res: Response) => {
        const user = await userRepo.login(req.body as IUser.Create)
        res.status(200).json({ success: true, message: "login successfull", data: user.refreshToken })
    },
    get: async (req: Request, res: Response) => {
        res.status(200).json({ success: true, message: "user fetched successfully", data: req.user })
    },
    update: async (req: Request, res: Response) => {
        const user = await userRepo.update(req.user!._id, req.body)
        res.status(200).json({ success: true, message: "user updated successfully" })
    },
   
}