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
exports.UserController = void 0;
const UserBusiness_1 = require("../business/UserBusiness");
const Authenticator_1 = require("../services/Authenticator");
const UserDatabase_1 = require("../data/UserDatabase");
const BaseDatabase_1 = require("../data/BaseDatabase");
const HashManager_1 = require("../services/HashManager");
const IdGenerator_1 = require("../services/IdGenerator");
class UserController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, nickname, password, role, } = req.body;
            try {
                const result = yield UserController.UserBusiness.signup(name, email, nickname, password, role);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(err.statusCode || 400).send({
                    error: err.message
                });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
    signupAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, nickname, email, password, role, } = req.body;
            try {
                const result = yield UserController.UserBusiness.signupAdmin(name, nickname, email, password, role);
                res.status(200).send({
                    result
                });
            }
            catch (err) {
                res.status(err.statusCode || 400).send({
                    error: err.message
                });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nickname, email, password } = req.body;
                const result = yield UserController.UserBusiness.login(nickname, email, password);
                res.status(200).send({
                    result
                });
            }
            catch (err) {
                res.status(err.statusCode || 400).send({
                    error: err.message
                });
            }
        });
    }
    bandSignup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, nickname, password, description } = req.body;
            try {
                yield UserController.UserBusiness.bandSignup(name, email, nickname, password, description);
                res.status(200).send({
                    message: "Aguarde para ser aprovado"
                });
            }
            catch (err) {
                res.status(err.statusCode || 400).send({
                    error: err.message
                });
            }
        });
    }
    getApprovedBand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            try {
                const band = yield UserController.UserBusiness.getApprovedBands(token);
                res.status(200).send({
                    band
                });
            }
            catch (err) {
                res.status(err.statusCode || 400).send({
                    error: err.message
                });
            }
        });
    }
    approvesBand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const { id } = req.body;
            try {
                const band = yield UserController.UserBusiness.approvesBand(id, token);
                res.status(200).send({
                    band
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
exports.UserController = UserController;
UserController.UserBusiness = new UserBusiness_1.UserBusiness(new UserDatabase_1.UserDatabase(), new HashManager_1.HashManager(), new Authenticator_1.Authenticator(), new IdGenerator_1.IdGenerator());
