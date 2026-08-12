import express from "express";
import userRouter from "./userRouter.js";
import locationRouter from "./locationRouter.js";

import verificationRouter from "./verificationRouter.js";
import { agentRouter } from "./agentRouter.js";
import { cameraRouter } from "./cameraRouter.js";
import { connectionRouter } from "./connectionRouter.js";

export const router = express.Router();
router.use("/user", userRouter)
router.use("/verification", verificationRouter)
router.use("/location", locationRouter)
router.use("/agent", agentRouter)
router.use("/connection", connectionRouter)
router.use("/camera", cameraRouter)