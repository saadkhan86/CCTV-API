import {Document} from "mongoose"

export declare namespace IAgent{

    interface Register{
        locationId:string
        name:string
        version:string
        status:"installed"|"online"|"offline"|"error"
        lastSeenAt:Date
        hostName:string
        ipAddress:string
        os:string
    }
    
    interface Doc extends Document , Register{
    
    }
    interface Update{
        agentId:string
        status:"installed"|"online"|"offline"|"error"
        lastSeenAt:Date
        hostName:string
        ipAddress:string
        os:string
    }
}