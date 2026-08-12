import { Types, Document } from "mongoose";

export declare namespace ICamera {
    interface Create {
        locationId: Types.ObjectId | string;
        agentId: Types.ObjectId | string;
        connectionId: Types.ObjectId | string;

        channel: number;
        name: string;

        ipAddress?: string;
        manufacturer?: string;
        cameraModel?: string;

        status: "discovered" | "active" | "inactive" | "offline";
        isActive: boolean;

        discoveredAt: Date;
        lastSeenAt?: Date;

    }
    interface Doc extends Document {

        locationId: Types.ObjectId | string;
        agentId: Types.ObjectId | string;
        connectionId: Types.ObjectId | string;

        channel: number;
        name: string;

        ipAddress?: string;
        manufacturer?: string;
        cameraModel?: string;

        status: "discovered" | "active" | "inactive" | "offline";
        isActive: boolean;

        discoveredAt: Date;
        lastSeenAt?: Date;
    }
    interface Update{
        cameraId:Types.ObjectId | string
        agentId: Types.ObjectId | string;

        ipAddress?: string;
        manufacturer?: string;
        cameraModel?: string;

        status: "discovered" | "active" | "inactive" | "offline";
        isActive: boolean;

    }
}