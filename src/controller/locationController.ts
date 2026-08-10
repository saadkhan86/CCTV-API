import { NextFunction, Request, Response } from "express"
import locationRepo from "../repositories/locationRepo.js"
import { ILocation } from "../interfaces/ILocation.js"

export const locationController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const location = await locationRepo.create({ ownerId: req.user!._id, ...req.body } as ILocation.Create)
            res.status(201).json({ success: true, message: "location created successfully", data: location })
        } catch (error: any) {
            return next(error)
        }
    },
    get: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const location = await locationRepo.get({ ownerId: req.user!._id, ...req.params } as ILocation.Get)
            res.status(200).json({
                success: true, message: "location fetched succssfully", data: location

            })
        } catch (error: any) {
            next(error)
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await locationRepo.update({ ownerId: req.user!._id, ...req.body } as ILocation.Update)
            if (!result) return res.status(404).json({ error: "Location not found" })
            res.json(result)
        } catch (error: any) {
            next(error)
        }
    },
    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await locationRepo.delete({ ownerId: req.user!._id, ...req.body } as ILocation.Delete)
            if (!result) return res.status(404).json({ error: "Location not found" })
            res.json(result)
        } catch (error: any) {
            next(error)
        }
    }
}
