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
exports.MusicController = void 0;
const MusicBusiness_1 = require("../business/MusicBusiness");
const MusicDatabase_1 = require("../data/MusicDatabase");
const UserDatabase_1 = require("../data/UserDatabase");
const IdGenerator_1 = require("../services/IdGenerator");
const Authenticator_1 = require("../services/Authenticator");
const BaseDatabase_1 = require("../data/BaseDatabase");
const AlbunsDataBase_1 = require("../data/AlbunsDataBase");
class MusicController {
    createMusic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const { name, albumId } = req.body;
            try {
                yield MusicController.MusicBusiness.createMusic(token, name, albumId);
                res.status(200).send({
                    message: "Musica criada com sucesso!"
                });
            }
            catch (err) {
                res.status(err.statusCode || 400).send({
                    message: err.message
                });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
}
exports.MusicController = MusicController;
MusicController.MusicBusiness = new MusicBusiness_1.MusicBusiness(new MusicDatabase_1.MusicDatabase(), new AlbunsDataBase_1.AlbunsDatabase(), new UserDatabase_1.UserDatabase(), new IdGenerator_1.IdGenerator(), new Authenticator_1.Authenticator());
