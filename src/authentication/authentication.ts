import { Request, Response } from "express"
import { User } from "../models/user.model.js"
import CustomError from "../errorHandler/customError.js"
import { tokenUtils } from "../utils/tokenUtils.js"
import { firebaseAuth } from "../services/firebase.service.js"

const authentication = {
    user: async (req: Request, res: Response, next: Function) => {
        try {
            if (
                req.headers.authorization &&
                req.headers.authorization.startsWith("Bearer")
            ) {
                const token = req.headers.authorization.split(" ")[1]
                let user: any
                try {
                    const decodedByFirebase: any = await firebaseAuth.verifyIdToken(token as string)
                    user = await User.findOne({ fid: decodedByFirebase.uid })
                    if (!user) {
                        user = await User.create({
                            email: decodedByFirebase.email,
                            name:
                                decodedByFirebase.name ||
                                decodedByFirebase.email?.split("@")[0] ||
                                "CCTV-Intel User",
                            isEmailVerified: decodedByFirebase.email_verified,
                            phoneNumber: decodedByFirebase.phone_number,
                            avatarUrl: decodedByFirebase.picture,
                            provider: decodedByFirebase.firebase.sign_in_provider,
                            fid: decodedByFirebase.uid,
                        })
                    }
                } catch (firebaseError) {
                    try {
                        const decodedByJWT = tokenUtils.verifyAccessToken(token as string)
                        user = await User.findById(decodedByJWT?._id)
                        if (!user)
                            return res
                                .status(404)
                                .json({ success: false, message: "user not found" })
                        if (user.isEmailVerified == false) {
                            return res.status(403).json({ success: false, message: "email verification required" })
                        }
                    } catch (jwtError) {
                        return res
                            .status(401)
                            .json({ success: false, message: "Invalid or Expired token" })
                    }
                }
                req.user = user
                return next()
            } else {
                throw new CustomError("token required", 401)
            }
        } catch (error: any) {
            console.error("Authentication Error:", error.message || error)
            next(error)
        }
    },
}
export default authentication