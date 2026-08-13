import mongoose, { Schema, Document } from "mongoose";
import { ICamera } from "../interfaces/ICamera.js";


const CameraSchema = new Schema<ICamera.Doc>(
    {
        locationId: {
            type: Schema.Types.ObjectId,
            ref: "Location",
            required: true,
            index: true,
        },

        agentId: {
            type: Schema.Types.ObjectId,
            ref: "Agent",
            required: true,
            index: true,
        },

        connectionId: {
            type: Schema.Types.ObjectId,
            ref: "DVR_NVR_Connection",
            required: true,
            index: true,
        },

        channel: {
            type: Number,
            required: true,
            min: 1,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        ipAddress: {
            type: String,
            trim: true,
        },

        manufacturer: {
            type: String,
            trim: true,
        },

        model: {
            type: String,
            trim: true,
        },

        status: {
            type: String,
            enum: ["discovered", "active", "inactive", "offline"],
            default: "discovered",
        },

        isActive: {
            type: Boolean,
            default: false,
        },

        discoveredAt: {
            type: Date,
            default: Date.now,
        },

        lastSeenAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);
CameraSchema.index({isActive:1})

export const Camera = mongoose.model<ICamera.Doc>("Camera",CameraSchema)