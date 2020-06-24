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
exports.GenreBusiness = void 0;
const GenreDatabase_1 = require("../data/GenreDatabase");
const UserDatabase_1 = require("../data/UserDatabase");
const IdGenerator_1 = require("../services/IdGenerator");
const Authenticator_1 = require("../services/Authenticator");
const User_1 = require("../model/User");
const Genre_1 = require("../model/Genre");
const GenericError_1 = require("../errors/GenericError");
class GenreBusiness {
    constructor(genreDatabase, userDatabase, idGenerator, authenticator) {
        this.genreDatabase = genreDatabase;
        this.userDatabase = userDatabase;
        this.idGenerator = idGenerator;
        this.authenticator = authenticator;
    }
    createGenre(name, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const authenticator = new Authenticator_1.Authenticator();
            const userData = authenticator.verify(token);
            const userDatabase = new UserDatabase_1.UserDatabase();
            const user = yield userDatabase.getUserById(userData.id);
            if ((user === null || user === void 0 ? void 0 : user.getRole()) !== User_1.UserRole.ADMIN) {
                throw new GenericError_1.GenericError("Apenas administradores podem acessar");
            }
            const idGenerator = new IdGenerator_1.IdGenerator();
            const id = idGenerator.generatorId();
            const genreData = new Genre_1.Genre(id, name);
            const genreDatabase = new GenreDatabase_1.GenreDatabase();
            yield genreDatabase.createGenre(genreData);
            const genre = yield genreDatabase.getGenreByName(name);
            if (genre) {
                throw new GenericError_1.GenericError("Esse genêro foi adicionado");
            }
        });
    }
    getAllGenres(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const authenticator = new Authenticator_1.Authenticator();
            const genreData = authenticator.verify(token);
            const userDatabase = new UserDatabase_1.UserDatabase();
            const user = yield userDatabase.getUserById(genreData.id);
            const genreDatabase = new GenreDatabase_1.GenreDatabase();
            const genre = yield genreDatabase.getAllGenres();
            return genre;
        });
    }
}
exports.GenreBusiness = GenreBusiness;
