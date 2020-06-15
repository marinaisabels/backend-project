import express from "express";
import { UserController } from "../controller/UserController";



//linha responsável por criar um módulo de rotas no express
export const userRouter = express.Router();
export const bandRouter = express.Router();


const userController = new UserController();
const bandController = new UserController();


userRouter.post("/signup", userController.signup);
userRouter.post("/signup-admin", userController.signupAdmin)
userRouter.post("/login", userController.login);

bandRouter.post("/signup-band", bandController.signup)
bandRouter.post("/approve", bandController.approvesBand)

bandRouter.get("/approve-band", bandController.getApprovedBand)