import CustomError from "../errorHandler/customError.js"
import { IAgent } from "../interfaces/IAgent.js"
import { Agent } from "../models/agent.model.js"

class agentRepo{
    
    public async register(data:IAgent.Register){
        const agent = await Agent.create({
            locationId:data.locationId,
            name:data.name || "CCTV-Agent",
            version:data.version || "1.0.0",
            status:data.status || "installed",
            lastSeenAt:data.lastSeenAt || new Date(Date.now()),
            hostName:data.hostName,
            ipAddress:data.ipAddress,
            os:data.os
        })
        return data
    }

    public async update(data:IAgent.Update){
        const agent = await Agent.findById(data.agentId)
        if(!agent) throw new CustomError("agent not found",404)
        if(data.status) agent.status = data.status
        if(data.hostName) agent.hostName = data.hostName
        if(data.ipAddress) agent.ipAddress = data.ipAddress
        if(data.lastSeenAt) agent.lastSeenAt = data.lastSeenAt || new Date(Date.now())
        if(data.os) agent.os = data.os
        return await agent.save()
    }
}
export default new agentRepo()