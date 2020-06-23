"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genreRouter = void 0;
const express_1 = __importDefault(require("express"));
const GenreController_1 = require("../controller/GenreController");
exports.genreRouter = express_1.default.Router();
const genreController = new GenreController_1.GenreController();
exports.genreRouter.post("/new-genre", genreController.createGenre);
exports.genreRouter.get("all-genre", genreController.getAllGenres);
