import { Document, Types } from "mongoose"

export declare namespace IAgent {

    interface Register {
        agentToken: string
        locationId: string | Types.ObjectId
        name: string
        version: string
        status: "installed" | "offline" | "online" | "error"
        lastSeenAt: Date
        hostName: string
        ipAddress: string
        os: string
    }

    interface Doc extends Document, Register {

    }
    interface Update {
        agentId: string | Types.ObjectId
        status: "online" | "offline" | "error"
        lastSeenAt: Date
        hostName: string
        ipAddress: string
        os: string
    }
}