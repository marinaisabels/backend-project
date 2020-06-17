import express from "express";
import { AlbumController } from "../controller/AlbunsController";


export const albumRouter = express.Router();

const albumController = new AlbumController();

albumRouter.post("/new-album", albumController.createAlbum);

// albumRouter.get("all-genre", genreController.getAllGenres);