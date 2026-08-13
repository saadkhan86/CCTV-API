import { NextFunction, Request, Response } from "express";
import cameraRepo from "../repositories/cameraRepo.js";

export const cameraController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        const {cameras} = req.body
        if(!Array.isArray(cameras)){
           return res.status(400).json({success:false,message:"Cameras array is required"})
        }
        const locationId = req.params.locationId 
        const agentId = req.params.locationId  
        const connectionId = req.params.connectionId 
        if(!locationId || !agentId || !connectionId){
            return res.status(400).json({success:false,message:"locationId , agentId , connectionId are required"})
        }
        const createdCameras = await cameraRepo.create({locationId : locationId as string,agentId:agentId as string,connectionId:connectionId as string},cameras)
        res.status(201).json({success:true,message:"cameras inserted successfully",data:createdCameras})
    },
    get: async (req: Request, res: Response, next: NextFunction) => {
        const camera = await cameraRepo.get({cameraId:req.params.cameraId as string,agentId:req.params.agentId as string})
        res.status(200).json({success:true,message:"Cameras fetched successfully",data:camera})
    },
    update: async (req: Request, res: Response, next: NextFunction) => {
        const camera = await cameraRepo.update({cameraId:req.params.cameraId,agentId:req.params.agentId,...req.body})
        res.status(200).json({success:true,message:"camera updated successfully",data:camera})
    },
}