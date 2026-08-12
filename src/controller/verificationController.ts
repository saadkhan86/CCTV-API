import { NextFunction, Request, Response } from "express";
import verificationRepo from "../repositories/verificationRepo.js";
import emailUtils from "../utils/emailUtils.js";

export const verificationController = {
    verifyEmail: async (req: Request, res: Response, next: NextFunction) => {
        const { token } = req.params
        if (!token) res.status(499).json({ success: false, message: "verification token required" })
        await verificationRepo.verifyEmail(token as string)
        res.status(200).json({ success: true, message: "email verification succssfull" })
    }, resendVerificationEmail: async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body
        if (!email) res.status(400).json({ success: false, message: "user email required" })
        const user = await verificationRepo.resendVerificationEmail(email)
        emailUtils.sendVerificationEmail(user.email, user.emailVerificationToken as string).catch((error) => {
            console.error("something went wrong while sending verification email -> ", error)
            res.status(500).json({ success: false, "message": "an error occured while sending email" })
        })
        res.status(200).json({ success: true, "message": `verification email has been sent to ${user.email} ` })
    }
}