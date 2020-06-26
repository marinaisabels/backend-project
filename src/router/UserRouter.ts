import express from "express";
import { UserController } from "../controller/UserController";


export const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", userController.signup);
userRouter.post("/signup-admin", userController.signupAdmin)
userRouter.post("/signup-band", userController.bandSignup)

userRouter.post("/approve", userController.approvedBandByAdmin)
userRouter.post("/login", userController.login);

userRouter.get("/all-bands", userController.getApprovedBand)