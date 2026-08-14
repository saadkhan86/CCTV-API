import mongoose, { Document, Schema } from "mongoose";

export interface IStream extends Document {
  cameraId: mongoose.Types.ObjectId;
  agentId: mongoose.Types.ObjectId;
  locationId: mongoose.Types.ObjectId;

  streamPath: string;

  protocol: "SRT" | "RTSP";

  status: "starting" | "streaming" | "stopped" | "error";

  mediaServer?: string;

  startedAt?: Date;
  stoppedAt?: Date;
  lastSeenAt?: Date;

  errorMessage?: string;

  createdAt: Date;
  updatedAt: Date;
}

const streamSchema = new Schema<IStream>(
  {
    cameraId: {
      type: Schema.Types.ObjectId,
      ref: "Camera",
      required: true,
    },

    agentId: {
      type: Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },

    locationId: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },

    /*
     * Example:
     * location_123/camera_456
     *
     * MediaMTX path can be generated from this.
     */
    streamPath: {
      type: String,
      required: true,
      trim: true,
    },

    protocol: {
      type: String,
      enum: ["SRT", "RTSP"],
      required: true,
    },

    status: {
      type: String,
      enum: ["starting", "streaming", "stopped", "error"],
      default: "starting",
    },

    mediaServer: {
      type: String,
      trim: true,
    },

    startedAt: {
      type: Date,
    },

    stoppedAt: {
      type: Date,
    },

    lastSeenAt: {
      type: Date,
    },

    errorMessage: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/*
 * One active stream per camera.
 */
streamSchema.index(
  {
    cameraId: 1,
  },
  {
    unique: true,
  }
);

/*
 * Useful for finding streams belonging
 * to a particular agent.
 */
streamSchema.index({
  agentId: 1,
});

/*
 * Useful for MediaMTX stream lookup.
 */
streamSchema.index({
  streamPath: 1,
});

export default mongoose.model<IStream>("Stream", streamSchema);
