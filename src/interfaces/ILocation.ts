import { Document, Types } from "mongoose";

export declare namespace ILocation {
    interface Doc extends Document {
        ownerId: Types.ObjectId | string;
        locationName: string;
        locationType: string;
        agentToken: string
        isDeleted: boolean;
    }
    interface Create {
        ownerId: Types.ObjectId | string;
        locationName: string;
        locationType: string;
    }
    interface Get {
        ownerId: Types.ObjectId | string
        locationName: string
        locationType: string
        page: number
        limit: number
    }
    interface Update {
        ownerId: Types.ObjectId | string;
        locationId: string;
        locationName?: string;
        locationType?: string;
    }
    interface Delete {
        ownerId: Types.ObjectId | string;
        locationId: string;
    }
}
