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
exports.AlbumBusiness = void 0;
const AlbunsDataBase_1 = require("../data/AlbunsDataBase");
const UserDatabase_1 = require("../data/UserDatabase");
const GenreDatabase_1 = require("../data/GenreDatabase");
const IdGenerator_1 = require("../services/IdGenerator");
const Authenticator_1 = require("../services/Authenticator");
const User_1 = require("../model/User");
const Albuns_1 = require("../model/Albuns");
const Genre_1 = require("../model/Genre");
const InvalidInputError_1 = require("../errors/InvalidInputError");
const GenericError_1 = require("../errors/GenericError");
const NotFoundError_1 = require("../errors/NotFoundError");
class AlbumBusiness {
    constructor(albunsDatabase, userDatabase, genreDatabase, idGenerator, authenticator) {
        this.albunsDatabase = albunsDatabase;
        this.userDatabase = userDatabase;
        this.genreDatabase = genreDatabase;
        this.idGenerator = idGenerator;
        this.authenticator = authenticator;
    }
    createAlbum(name, allGenre, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const authenticator = new Authenticator_1.Authenticator();
            const userData = authenticator.verify(token);
            if (!name ||
                !allGenre ||
                !token) {
                throw new InvalidInputError_1.InvalidInputError("Informações incompletas");
            }
            const userDatabase = new UserDatabase_1.UserDatabase();
            const user = yield userDatabase.getUserById(userData.id);
            if ((user === null || user === void 0 ? void 0 : user.getRole()) !== User_1.UserRole.BAND) {
                throw new GenericError_1.GenericError("Apenas administradores podem acessar");
            }
            const idGenerator = new IdGenerator_1.IdGenerator();
            const id = idGenerator.generatorId();
            const bandId = user.getId();
            const albumData = new Albuns_1.Album(id, bandId, name);
            const genreDatabase = new GenreDatabase_1.GenreDatabase();
            const genre = yield genreDatabase.getAllGenres();
            for (const genres of allGenre) {
                const result = yield genreDatabase.getGenreByName(name);
                if (result) {
                    yield genreDatabase.createGenre(new Genre_1.Genre(id, genres));
                }
                else {
                    throw new NotFoundError_1.NotFoundError("Não existe esse genêro");
                }
            }
            const albumDatabase = new AlbunsDataBase_1.AlbunsDatabase();
            yield albumDatabase.createAlbum(albumData);
            yield albumDatabase.genreAlbum(albumData.getId(), allGenre);
            const album = yield albumDatabase.getAlbumByName(name);
            if (album) {
                throw new GenericError_1.GenericError("Esse album foi adicionado");
            }
        });
    }
}
exports.AlbumBusiness = AlbumBusiness;
