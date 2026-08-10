import CustomError from "../errorHandler/customError.js"
import { IConnection } from "../interfaces/IConnection.js"
import { Connection } from "../models/DVR_NVR_Connection.model.js"

class connectionRepo {
    public async create(data: IConnection.Create) {
        const connection = await Connection.create({
            agentId: data.agentId,
            ipAddress: data.ipAddress,
            port: data.port,
            username: data.username,
            deviceType: data.deviceType,
            protocol: data.protocol,
            lastConnectedAt: data.lastConnectedAt || new Date(Date.now()),
        })
        return connection
    }
    public async update(data: IConnection.Update) {
        let connection = await Connection.findById(data.connectionId)
        if (!connection) {
            throw new CustomError("Connection not found", 404)
        }
        if (data.ipAddress) {
            connection.ipAddress = data.ipAddress
        }
        if (data.port) {
            connection.port = data.port
        }
        if (data.username) {
            connection.username = data.username
        }
        if (data.deviceType) {
            connection.deviceType = data.deviceType
        }
        if (data.protocol) {
            connection.protocol = data.protocol
        }
        if (data.lastConnectedAt) {
            connection.lastConnectedAt = data.lastConnectedAt
        }
        return await connection.save()
    }
}
export default new connectionRepo()