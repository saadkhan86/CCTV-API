import express from "express";
import userRouter from "./userRouter.js";
import locationRouter from "./locationRouter.js";
import authentication from "../authentication/authentication.js";

import verificationRouter from "./verificationRouter.js";

export const router = express.Router();
router.use("/user", userRouter)
router.use("/verification", verificationRouter)
router.use("/location", authentication.user, locationRouter)