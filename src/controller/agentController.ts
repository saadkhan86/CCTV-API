import {Request,Response,NextFunction} from "express"
import agentRepo from "../repositories/agentRepo.js";
import { IAgent } from "../interfaces/IAgent.js";
export const agentController = {
    register :async (req:Request,res:Response,next:NextFunction) => {
        const agent=await agentRepo.register(req.body as IAgent.Register)
       res.status(200).json({success:true,message:"agent created successfully",data:agent});
    },
    update : async(req:Request,res:Response,next:NextFunction)=>{
        const agent = await agentRepo.update({agentId:req.params.agentId,...req.body})
        res.status(200).json({success:true,message:"agent updated successfully",data:agent})
    }
}