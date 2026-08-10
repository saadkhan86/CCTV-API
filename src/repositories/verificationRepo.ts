import CustomError from "../errorHandler/customError.js";
import { User } from "../models/user.model.js";
import { tokenUtils } from "../utils/tokenUtils.js";

class VerificationRepo {
    public async verifyEmail(token: string) {
        const user = await User.findOne({ emailVerificationToken: token })
        if (!user) throw new CustomError("invalid token", 404)
        if (user.isEmailVerified == true) {
            throw new CustomError("email already verified", 422)
        }
        if (!user.verificationTokenExpires || user.verificationTokenExpires < new Date()) {
            throw new CustomError("verification token has expired", 410)
        }
        user.isEmailVerified = true
        user.emailVerificationToken = null
        user.verificationTokenExpires = null
        return await user.save()
    }
    public async resendVerificationEmail(email: string) {
        const user = await User.findOne({ email })
        if (!user) throw new CustomError("user does not exist", 404)
        if (user?.isEmailVerified == true) throw new CustomError("email already verified", 409)
        user.emailVerificationToken = tokenUtils.genTokenForVerification()
        user.verificationTokenExpires = new Date(Date.now() + 30 * 60 * 1000)
        return user
    }
}
export default new VerificationRepo()