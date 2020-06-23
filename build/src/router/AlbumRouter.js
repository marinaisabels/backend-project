"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.albumRouter = void 0;
const express_1 = __importDefault(require("express"));
const AlbunsController_1 = require("../controller/AlbunsController");
exports.albumRouter = express_1.default.Router();
const albumController = new AlbunsController_1.AlbumController();
exports.albumRouter.post("/new-album", albumController.createAlbum);
// albumRouter.get("all-genre", genreController.getAllGenres);
