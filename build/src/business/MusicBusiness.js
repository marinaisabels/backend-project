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
exports.MusicBusiness = void 0;
const MusicDatabase_1 = require("../data/MusicDatabase");
const UserDatabase_1 = require("../data/UserDatabase");
const IdGenerator_1 = require("../services/IdGenerator");
const Authenticator_1 = require("../services/Authenticator");
const Music_1 = require("../model/Music");
const User_1 = require("../model/User");
const InvalidInputError_1 = require("../errors/InvalidInputError");
const NotFoundError_1 = require("../errors/NotFoundError");
const GenericError_1 = require("../errors/GenericError");
;
class MusicBusiness {
    constructor(musicDatabase, albumDatabase, userDatabase, idGenerator, authenticator) {
        this.musicDatabase = musicDatabase;
        this.albumDatabase = albumDatabase;
        this.userDatabase = userDatabase;
        this.idGenerator = idGenerator;
        this.authenticator = authenticator;
    }
    createMusic(name, albumId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name ||
                !albumId ||
                !token) {
                throw new InvalidInputError_1.InvalidInputError("Parâmetros inválidos");
            }
            const authenticator = new Authenticator_1.Authenticator();
            const userData = authenticator.verify(token);
            const userDatabase = new UserDatabase_1.UserDatabase();
            const user = userDatabase.getUserById(userData.id);
            const userRole = User_1.UserRole.BAND;
            if (!user) {
                throw new NotFoundError_1.NotFoundError("Este usuário não existe");
            }
            if (!userRole) {
                throw new GenericError_1.GenericError("Apenas bandas podem acessar");
            }
            const idGenerator = new IdGenerator_1.IdGenerator();
            const id = idGenerator.generatorId();
            const musicdata = new Music_1.Music(id, albumId, name);
            const musicDatabase = new MusicDatabase_1.MusicDatabase();
            yield musicDatabase.createMusic(musicdata);
            const music = yield musicDatabase.getMusicsByAlbumId(id);
            if (music) {
                throw new Error("Essa musica foi adicionada");
            }
        });
    }
}
exports.MusicBusiness = MusicBusiness;
