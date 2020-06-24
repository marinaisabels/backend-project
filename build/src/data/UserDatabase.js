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
exports.UserDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const User_1 = require("../model/User");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    toModel(dbResult) {
        return (dbResult && new User_1.User(dbResult.id, dbResult.name, dbResult.email, dbResult.nickname, dbResult.password, dbResult.role, dbResult.description, dbResult.isApproved));
    }
    createListenerUserAndAdmin(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = this.toModel(user);
            yield this.connection()
                .insert({
                id: userData === null || userData === void 0 ? void 0 : userData.getId(),
                name: userData === null || userData === void 0 ? void 0 : userData.getName(),
                email: userData === null || userData === void 0 ? void 0 : userData.getEmail(),
                nickname: userData === null || userData === void 0 ? void 0 : userData.getNickname(),
                password: userData === null || userData === void 0 ? void 0 : userData.getPassword(),
                role: userData === null || userData === void 0 ? void 0 : userData.getRole()
            })
                .into(UserDatabase.TABLE_NAME);
        });
    }
    createUserBand(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = this.toModel(user);
            yield this.connection()
                .insert({
                id: userData === null || userData === void 0 ? void 0 : userData.getId(),
                name: userData === null || userData === void 0 ? void 0 : userData.getName(),
                email: userData === null || userData === void 0 ? void 0 : userData.getEmail(),
                password: userData === null || userData === void 0 ? void 0 : userData.getPassword(),
                role: userData === null || userData === void 0 ? void 0 : userData.getRole(),
                description: userData === null || userData === void 0 ? void 0 : userData.getDescription(),
                isApproved: this.convertBooleanToTinyint(false)
            })
                .into(UserDatabase.TABLE_NAME);
        });
    }
    getUserByEmailOrNickname(email, nickname) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection()
                .select("*")
                .from(UserDatabase.TABLE_NAME)
                .where({ email })
                .orWhere({ nickname });
            return this.toModel(result[0]);
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection()
                .select("*")
                .from(UserDatabase.TABLE_NAME)
                .where({ id });
            return this.toModel(result[0]);
        });
    }
    getApprovedBands(role) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection().raw(`
          SELECT *
          FROM ${UserDatabase.TABLE_NAME}
          WHERE role = "${role}"`);
            return result[0];
        });
    }
    getApproves(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection().raw(`
        UPDATE S${UserDatabase.TABLE_NAME}
        SET isApproved = 1
        Where id = "${id}"
        `);
            return result;
        });
    }
}
exports.UserDatabase = UserDatabase;
UserDatabase.TABLE_NAME = 'SpotUser';
