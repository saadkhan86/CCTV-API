import mongoose from "mongoose"
import { IAgent } from "../interfaces/IAgent.js"
const AgentSchema = new mongoose.Schema<IAgent.Doc>({
    locationId:{
        type:mongoose.Types.ObjectId,
        unique:true,
        required:[true,"location id is required"],
        ref:"Location"
    },name:{
        type:String,
        default:"CCTV Agent"
    },version:{
        type:String,
        default:"1.0.0"
    },status:{
        type:String,
        enum:["installed","online","offline","error"]
    },lastSeenAt:{
        type:Date,
        default:new Date(Date.now())
    },hostName:{
        type:String,
        required:true
    },ipAddress:{
        type:String,
        required:[true,"ip address is required"]
    },os:{
        type:String,
        required:[true,"operating system is required"]
    }
},{timestamps:true})

export const Agent = mongoose.model<IAgent.Doc>("Agent",AgentSchema)
