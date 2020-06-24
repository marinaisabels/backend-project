"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.musicRouter = void 0;
const express_1 = __importDefault(require("express"));
const MusicController_1 = require("../controller/MusicController");
exports.musicRouter = express_1.default.Router();
const musicController = new MusicController_1.MusicController();
exports.musicRouter.post("/new-music", musicController.createMusic);
