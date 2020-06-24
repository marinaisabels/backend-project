"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
//linha responsável por criar um módulo de rotas no express
exports.userRouter = express_1.default.Router();
const userController = new UserController_1.UserController();
exports.userRouter.post("/signup", userController.signup);
exports.userRouter.post("/signup-admin", userController.signupAdmin);
exports.userRouter.post("/login", userController.login);
exports.userRouter.post("/signup-band", userController.signup);
exports.userRouter.post("/approve", userController.getApprovedBand);
exports.userRouter.get("/all-bands", userController.approvesBand);
