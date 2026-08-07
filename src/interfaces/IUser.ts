import { Document } from "mongoose";

export declare namespace IUser {
    interface Doc extends Document {
        email: string
        passwordHash: string
        name: string
        emailVerificationToken: string | null
        verificationTokenExpires: Date | null
        isEmailVerified: boolean
        phoneNumber: string
        avatarUrl: string
        provider: string
        fid: string
        refreshToken: string
        comparePassword(password: string): Promise<boolean>
    }
    interface Create {
        email: string
        password: string
    }
    interface Update {
        name?: string
        email?: string
        password?: string
        phoneNumber?: string
        avatarUrl?: string
    }
}