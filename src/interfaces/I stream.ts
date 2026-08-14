
export declare namespace IStream {
  interface Create{
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
}
