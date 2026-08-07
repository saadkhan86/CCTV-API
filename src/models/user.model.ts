import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../interfaces/IUser.js";

const SALT_ROUNDS = 5;

const UserSchema = new Schema<IUser.Doc>({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        index: true,
        required: [true, "User email is required"],
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email address",
        ],
    },
    passwordHash: { type: String, default: null },
    name: { type: String, required: [true, "user name is required"], trim: true, unique: true },
    emailVerificationToken: { type: String, default: null },
    verificationTokenExpires: { type: Date, default: null },
    isEmailVerified: { type: Boolean, default: false },
    phoneNumber: {
        type: String, trim: true, unique: true, validate: {
            validator: (v: string) => {
                return /^\+[1-9]\d{1,14}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid E.164 phone number!`
        }
    },
    avatarUrl: { type: String, trim: true },
    provider: { type: String, required: true },
    fid: { type: String, default: null },
    refreshToken: { type: String, default: null },
}, { timestamps: true })

UserSchema.pre("save", async function () {
    if (this.isModified("password") && this.passwordHash) {
        this.passwordHash = await bcrypt.hash(this.passwordHash, SALT_ROUNDS)
    }
})
UserSchema.methods.comparePassword = function (password: string) {
    return bcrypt.compare(password, this.passwordHash)
}
export const User = model<IUser.Doc>("User", UserSchema)
