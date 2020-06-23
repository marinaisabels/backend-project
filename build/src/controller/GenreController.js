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
exports.GenreController = void 0;
const GenreDatabase_1 = require("../data/GenreDatabase");
const UserDatabase_1 = require("../data/UserDatabase");
const IdGenerator_1 = require("../services/IdGenerator");
const Authenticator_1 = require("../services/Authenticator");
const GenreBusiness_1 = require("../business/GenreBusiness");
class GenreController {
    createGenre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const { name } = req.body;
            try {
                yield GenreController.GenreBusiness.createGenre(name, token);
                res.status(200).send({
                    message: "Criado com sucesso!"
                });
            }
            catch (err) {
                res.status(err.statusCode || 400).send({
                    message: err.message
                });
            }
        });
    }
    getAllGenres(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            try {
                const genre = yield GenreController.GenreBusiness.getAllGenres(token);
                res.status(200).send({
                    genre
                });
            }
            catch (err) {
                res.status(err.statusCode || 400).send({
                    error: err.message
                });
            }
        });
    }
}
exports.GenreController = GenreController;
GenreController.GenreBusiness = new GenreBusiness_1.GenreBusiness(new GenreDatabase_1.GenreDatabase(), new UserDatabase_1.UserDatabase(), new IdGenerator_1.IdGenerator(), new Authenticator_1.Authenticator());
