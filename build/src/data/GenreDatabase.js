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
exports.GenreDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const Genre_1 = require("../model/Genre");
class GenreDatabase extends BaseDatabase_1.BaseDatabase {
    toModel(dbModel) {
        return dbModel && new Genre_1.Genre(dbModel.id, dbModel.name);
    }
    createGenre(genre) {
        return __awaiter(this, void 0, void 0, function* () {
            const genreData = this.toModel(genre);
            yield this.connection()
                .insert({
                id: genreData === null || genreData === void 0 ? void 0 : genreData.getId(),
                name: genreData === null || genreData === void 0 ? void 0 : genreData.getName()
            })
                .into(GenreDatabase.TABLE_NAME);
        });
    }
    getAllGenres() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection().raw(`
        SELECT *
        FROM ${GenreDatabase.TABLE_NAME}
        WHERE id`);
            return result[0];
        });
    }
    getGenreByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection()
                .select("*")
                .from(GenreDatabase.TABLE_NAME)
                .where({ name });
            return result[0];
        });
    }
}
exports.GenreDatabase = GenreDatabase;
GenreDatabase.TABLE_NAME = "SpotGenre";
