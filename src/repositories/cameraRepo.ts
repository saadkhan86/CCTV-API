import { ICamera } from "../interfaces/ICamera.js"
import { Camera } from "../models/Camera.model.js"

class cameraRepo {
    public async create(data: ICamera.Create) {
        return await Camera.create(data)
    }
    public async update(data: ICamera.Update) {
        return await Camera.findByIdAndUpdate(data.cameraId, data, { new: true })
    }
}
export default new cameraRepo()