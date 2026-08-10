
import { Types } from "mongoose";
import CustomError from "../errorHandler/customError.js";
import { IUser } from "../interfaces/IUser.js";
import { User } from "../models/user.model.js";
import { tokenUtils } from "../utils/tokenUtils.js";

class userRepo {
    public async signup(data: IUser.Create) {
        const verificationToken = tokenUtils.genTokenForVerification()
        const verificationTokenExpires = new Date(Date.now() + 30 * 60 * 1000)
        const user = await User.create({
            email: data.email,
            passwordHash: data.password,
            emailVerificationToken: verificationToken,
            verificationTokenExpires
        })
        return user
    }
    public async login(data: IUser.Create) {
        const user = await User.findOne({ email: data.email })
        if (!user) throw new CustomError("user not found", 404)
        if (user.isEmailVerified == false) throw new CustomError("email verification required", 403)
        const isMatch = await user.comparePassword(data.password)
        if (!isMatch) throw new CustomError("invalid credentials", 401)
        user.refreshToken = tokenUtils.generateRefreshToken(user._id)
        return { refreshToken: user.refreshToken }
    }
    public async update(userId: string | Types.ObjectId, data: IUser.Update) {
        let user = await User.findById(userId)
        if (!user) throw new CustomError("user not found", 404)
        if (data.email) user.email = data.email
        if (data.name) user.name = data.name
        if (data.password) user.passwordHash = data.password
        if (data.phoneNumber) user.phoneNumber = data.phoneNumber
        if (data.avatarUrl) user.avatarUrl = data.avatarUrl

        return await user.save()
    }
    
}
export default new userRepo()
