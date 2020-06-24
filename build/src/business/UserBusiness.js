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
exports.UserBusiness = void 0;
const IdGenerator_1 = require("../services/IdGenerator");
const HashManager_1 = require("../services/HashManager");
const UserDatabase_1 = require("../data/UserDatabase");
const User_1 = require("../model/User");
const Authenticator_1 = require("../services/Authenticator");
const InvalidInputError_1 = require("../errors/InvalidInputError");
const GenericError_1 = require("../errors/GenericError");
const NotFoundError_1 = require("../errors/NotFoundError");
class UserBusiness {
    constructor(userDatabase, hashManager, authenticator, idGenerator) {
        this.userDatabase = userDatabase;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
        this.idGenerator = idGenerator;
    }
    signup(name, email, nickname, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name ||
                !email ||
                !nickname ||
                !password) {
                throw new InvalidInputError_1.InvalidInputError("Parâmetros Inválidos");
            }
            if (password.length < 6) {
                throw new GenericError_1.GenericError("A senha deverá ter no mínimo 6 caracteres");
            }
            if (email.indexOf("@") === -1) {
                throw new InvalidInputError_1.InvalidInputError("Email inválido");
            }
            const idGenerator = new IdGenerator_1.IdGenerator();
            const id = idGenerator.generatorId();
            const hashManager = new HashManager_1.HashManager();
            const hashPassword = yield hashManager.hash(password);
            const user = new User_1.User(id, name, email, nickname, hashPassword, role);
            const userDatabase = new UserDatabase_1.UserDatabase();
            yield userDatabase.createListenerUserAndAdmin(user);
            const authenticator = new Authenticator_1.Authenticator();
            const acessToken = authenticator.generationToken({
                id,
                role
            }, process.env.ACCESS_TOKEN_EXPIRES_IN);
            return {
                acessToken
            };
        });
    }
    signupAdmin(name, nickname, email, password, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email ||
                !name ||
                !nickname ||
                !password) {
                throw new InvalidInputError_1.InvalidInputError("Parâmetros Inválidos");
            }
            if (password.length < 10) {
                throw new GenericError_1.GenericError("A senha deverá ter no mínimo 10 caracteres");
            }
            if (email.indexOf("@") === -1) {
                throw new InvalidInputError_1.InvalidInputError("Email inválido");
            }
            const role = User_1.UserRole.ADMIN;
            const idGenerator = new IdGenerator_1.IdGenerator();
            const id = idGenerator.generatorId();
            const hashManager = new HashManager_1.HashManager();
            const hashPassword = yield hashManager.hash(password);
            const user = new User_1.User(id, name, nickname, email, hashPassword, role);
            const userDatabase = new UserDatabase_1.UserDatabase();
            yield userDatabase.createListenerUserAndAdmin(user);
            const authenticator = new Authenticator_1.Authenticator();
            if (user.getRole() !== User_1.UserRole.ADMIN) {
                throw new GenericError_1.GenericError("Só administradores podem acessar");
            }
            const acessToken = authenticator.generationToken({
                id,
                role
            }, process.env.ACCESS_TOKEN_EXPIRES_IN);
            return {
                acessToken
            };
        });
    }
    login(nickname, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDataBase = new UserDatabase_1.UserDatabase();
            const user = yield userDataBase.getUserByEmailOrNickname(email, nickname);
            if (!user) {
                throw new InvalidInputError_1.InvalidInputError("Parâmetros incorretos !");
            }
            if (!nickname ||
                !email ||
                !password) {
                throw new InvalidInputError_1.InvalidInputError("Parâmetros Inválidos");
            }
            const authenticator = new Authenticator_1.Authenticator();
            const acessToken = authenticator.generationToken({
                id: user.getId(),
                role: user.getRole()
            }, process.env.ACCESS_TOKEN_EXPIRES_IN);
            const hashManager = new HashManager_1.HashManager();
            const comparePasswords = yield hashManager.compare(password, user.getPassword());
            if (!comparePasswords) {
                throw new GenericError_1.GenericError("Informações inválidas");
            }
            return { acessToken };
        });
    }
    bandSignup(name, email, nickname, password, description) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email ||
                !name ||
                !nickname ||
                !password) {
                throw new InvalidInputError_1.InvalidInputError("Parâmetros Inválidos");
            }
            if (password.length < 6) {
                throw new GenericError_1.GenericError("A senha deverá ter no mínimo 6 caracteres");
            }
            if (email.indexOf("@") === -1) {
                throw new InvalidInputError_1.InvalidInputError("Email inválido");
            }
            const role = User_1.UserRole.BAND;
            const idGenerator = new IdGenerator_1.IdGenerator();
            const id = idGenerator.generatorId();
            const hashManager = new HashManager_1.HashManager();
            const hashPassword = yield hashManager.hash(password);
            const band = new User_1.User(id, name, email, nickname, hashPassword, User_1.stringToUserRole(role), description);
            const userDatabase = new UserDatabase_1.UserDatabase();
            yield userDatabase.createUserBand(band);
        });
    }
    getApprovedBands(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const authenticator = new Authenticator_1.Authenticator();
            const bandData = authenticator.verify(token);
            if (bandData.role !== "ADMIN" || "admin") {
                throw new GenericError_1.GenericError("Acesso negado!");
            }
            const userDatabase = new UserDatabase_1.UserDatabase();
            const band = yield userDatabase.getApprovedBands(token);
            return band.map(band => {
                const isApproved = band.getApproved() === true ? true : false;
                return {
                    name: band.getName(),
                    email: band.getEmail(),
                    nickname: band.getNickname(),
                    isApproved: isApproved
                };
            });
        });
    }
    approvesBand(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const authenticator = new Authenticator_1.Authenticator();
            const bandData = authenticator.verify(token);
            const userDatabase = new UserDatabase_1.UserDatabase();
            const user = yield userDatabase.getApproves(bandData.id);
            if (!user) {
                throw new NotFoundError_1.NotFoundError("Usuário não encontrado");
            }
            if (user.getRole() !== User_1.UserRole.ADMIN) {
                throw new GenericError_1.GenericError("Acesso apenas para administradores");
            }
            const band = yield userDatabase.getApproves(id);
            if (!band) {
                throw new NotFoundError_1.NotFoundError("Band não encontrada");
            }
            if (band.getApproves() == true) {
                throw new GenericError_1.GenericError("Banda Aprovada!");
            }
        });
    }
}
exports.UserBusiness = UserBusiness;
