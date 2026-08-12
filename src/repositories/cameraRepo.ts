import CustomError from "../errorHandler/customError.js"
import { ICamera } from "../interfaces/ICamera.js"
import { Camera } from "../models/Camera.model.js"
import 
class cameraRepo {
    public async create(data: ICamera.Create) {
        return await Camera.create(data)
    }
    public async get(data:{cameraId:Types.ObjectId | string,agentId:TypeErrorConstructor.ObjectId | string}){
        
    }
    public async update(data: ICamera.Update) {
        let camera =  await Camera.findById(data.cameraId)
        if(!camera) throw new CustomError("Camera not found",404)
        if(data.cameraModel) camera.cameraModel = data.cameraModel
        if(data.ipAddress) camera.ipAddress = data.ipAddress
        if(data.isActive) camera.isActive = data.isActive
        if(data.manufacturer) camera.manufacturer = data.manufacturer
        if(data.status) camera.status = data.status
        return await camera.save()
    }   
}
export default new cameraRepo()