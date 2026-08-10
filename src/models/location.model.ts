import mongoose, { Schema, model } from "mongoose";
import { ILocation } from "../interfaces/ILocation.js";

const LocationSchema = new Schema<ILocation.Doc>({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    locationName: { type: String, required: true, trim: true, minLength: 10, maxLength: 100 },
    locationType: { type: String, required: true, trim: true, minLength: 10, maxLength: 50 },
    agentToken: {
        type: String,
        default: null
    },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true })
LocationSchema.index({ agentToken: 1 }, { unique: true })
export const Location = model<ILocation.Doc>("Location", LocationSchema)
