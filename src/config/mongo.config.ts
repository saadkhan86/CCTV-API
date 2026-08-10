import mongoose from "mongoose";
export const connection = async () => {
    try {
        return await mongoose.connect("/")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}