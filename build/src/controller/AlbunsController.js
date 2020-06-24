"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumController = void 0;
const UserDatabase_1 = require("../data/UserDatabase");
const AlbunsDataBase_1 = require("../data/AlbunsDataBase");
const GenreDatabase_1 = require("../data/GenreDatabase");
const IdGenerator_1 = require("../services/IdGenerator");
const Authenticator_1 = require("../services/Authenticator");
const AlbunsBusiness_1 = require("../business/AlbunsBusiness");
class AlbumController {
    createAlbum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const { name, allGenre } = req.body;
            try {
                yield AlbumController.AlbumBusiness.createAlbum(name, allGenre, token);
                res.status(200).send({
                    message: "Album Criado com sucesso!"
                });
            }
            catch (err) {
                res.status(err.statusCode || 400).send({
                    message: err.message
                });
            }
        });
    }
}
exports.AlbumController = AlbumController;
AlbumController.AlbumBusiness = new AlbunsBusiness_1.AlbumBusiness(new AlbunsDataBase_1.AlbunsDatabase(), new UserDatabase_1.UserDatabase(), new GenreDatabase_1.GenreDatabase(), new IdGenerator_1.IdGenerator(), new Authenticator_1.Authenticator());
