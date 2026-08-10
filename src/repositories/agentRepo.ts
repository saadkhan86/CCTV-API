import CustomError from "../errorHandler/customError.js"
import { IAgent } from "../interfaces/IAgent.js"
import { Agent } from "../models/agent.model.js"
import { Location } from "../models/location.model.js"

class agentRepo {

    public async register(data: IAgent.Register) {
        const location = await Location.findOneAndUpdate({ agentToken: data.agentToken }, { agentToken: null })
        if (!location) throw new CustomError("Agent verification token is invalid or expired.", 403)
        const agent = await Agent.create({
            locationId: location._id,
            name: data.name || "CCTV-Agent",
            version: data.version || "1.0.0",
            status: data.status || "installed",
            lastSeenAt: new Date(Date.now()),
            hostName: data.hostName,
            ipAddress: data.ipAddress,
            os: data.os
        })
        return agent
    }

    public async update(data: IAgent.Update) {
        const agent = await Agent.findById(data.agentId)
        if (!agent) throw new CustomError("agent not found", 404)
        if (data.status) agent.status = data.status
        if (data.hostName) agent.hostName = data.hostName
        if (data.ipAddress) agent.ipAddress = data.ipAddress
        if (data.lastSeenAt) agent.lastSeenAt = data.lastSeenAt || new Date(Date.now())
        if (data.os) agent.os = data.os
        return await agent.save()
    }
}
export default new agentRepo()