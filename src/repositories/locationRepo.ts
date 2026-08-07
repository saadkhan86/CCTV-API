import CustomError from "../errorHandler/customError.js";
import { ILocation } from "../interfaces/ILocation.js";
import { Location } from "../models/location.model.js";

class locationRepo {
    public async create(data: ILocation.Create) {
        const location = Location.create({ ownerId: data.ownerId, locationName: data.locationName, locationType: data.locationType })
        return location
    }

    public async get(data: ILocation.Get) {
        const { page, limit } = data
        let _query: Record<string, any> = {}
        if (data.locationName) {
            _query.locationName = data.locationName
        }
        if (data.locationType) {
            _query.locationType = data.locationType
        }
        return await Location.find(_query).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit).lean()
    }

    public async update(data: ILocation.Update) {
        let location = await Location.findOne({ _id: data.locationId, ownerId: data.ownerId })
        if (!location)
            throw new CustomError("location not found", 404)

        if (data.locationName) location.locationName = data.locationName
        if (data.locationType) location.locationType = data.locationType
        return await location.save()
    }

    public async delete(data: ILocation.Delete) {
        let location = await Location.findOne({ _id: data.locationId, ownerId: data.ownerId })
        if (!location) throw new CustomError("location not found", 404)
        location.isDeleted = true
        return await location.save()
    }
}
export default new locationRepo()
