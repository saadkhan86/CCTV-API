import { Document, Types } from "mongoose";

export declare namespace IConnection {
    interface Create {
        agentId: string | Types.ObjectId;
        ipAddress: string;
        port: number;
        username: string;
        deviceType: string;
        protocol: "ONVIF" | "vendor_api" | "other"
        lastConnectedAt: Date
    }
    interface Doc extends Create, Document {

    }
    interface Update {
        connectionId: string | Types.ObjectId;
        ipAddress?: string;
        port?: number;
        username?: string;
        deviceType?: string;
        protocol?: "ONVIF" | "vendor_api" | "other"
        lastConnectedAt?: Date
    }
}