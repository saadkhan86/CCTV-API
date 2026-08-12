import { NextFunction, Request, Response } from "express";
import cameraRepo from "../repositories/cameraRepo.js";
import { ICamera } from "../interfaces/ICamera.js";

export const cameraController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        const camera = await cameraRepo.create(req.body as ICamera.Create)
    },
    get: async (req: Request, res: Response, next: NextFunction) => {
        
    },
    update: async (req: Request, res: Response, next: NextFunction) => {

    },
}