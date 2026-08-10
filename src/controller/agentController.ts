import { Request, Response, NextFunction } from "express"
import agentRepo from "../repositories/agentRepo.js";
import { IAgent } from "../interfaces/IAgent.js";
export const agentController = {
    register: async (req: Request, res: Response, next: NextFunction) => {
        const agent: IAgent.Doc = await agentRepo.register({ ...req.body, agentToken: req.params.agentToken } as IAgent.Register)
        res.status(201).json({ success: true, message: "Agent Created Successfully", data: { agentId: agent._id } });
    },
    update: async (req: Request, res: Response, next: NextFunction) => {
        const agent: IAgent.Doc = await agentRepo.update({ agentId: req.params.agentId, ...req.body } as IAgent.Update)
        res.status(200).json({ success: true, message: "Agent Updated Successfully", data: { agentId: agent._id } })
    }
}