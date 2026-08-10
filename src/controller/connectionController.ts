import { NextFunction, Response, Request } from "express";
import connectionRepo from "../repositories/connectionRepo.js";
import { IConnection } from "../interfaces/IConnection.js";

export const connectionController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        const connection = await connectionRepo.create(req.body as IConnection.Create)
        return res.status(201).json({ message: "Connection created successfull", data: connection })
    },
    update: async (req: Request, res: Response, next: NextFunction) => {
        const connection = await connectionRepo.update({ connectionId: req.params.connectionId, ...req.body } as IConnection.Update)
        return res.status(200).json({ message: "Connection updated successfully", data: connection })
    }
}