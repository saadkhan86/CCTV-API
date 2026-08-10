import mongoose from "mongoose"
import { IConnection } from "../interfaces/IConnection.js"
const DVR_NVR_ConnectionSchema = new mongoose.Schema<IConnection.Doc>({
    agentId: {
        type: mongoose.Types.ObjectId,
        required: [true, "agent id is required"],
        ref: "Agent"
    }, deviceType: {
        type: String,
        required: [true, "device type is required"]
    }, ipAddress: {
        type: String,
        required: [true, "DVR/NVR ip address is required"]
    }, port: {
        type: Number,
        required: [true, "PORT number is required"]
    }, username: {
        type: String,
        default: null
    }, protocol: {
        type: String,
        enum: ["ONVIF", "vendor_api", "other"],
        required: [true, "DVR/NVR protocol is required"]
    }, lastConnectedAt: {
        type: Date,
        default: new Date(Date.now())
    }
}, { timestamps: true })
DVR_NVR_ConnectionSchema.index({ agentId: 1 }, { unique: true })
export const Connection = mongoose.model<IConnection.Doc>("DVR-NVR-Connection", DVR_NVR_ConnectionSchema)