import { NextFunction, Request, Response } from "express"

export const tokenController = {
    verifyEmail: async (req: Request, res: Response, next: NextFunction) => {
        const { token } = req.params


    }
} 