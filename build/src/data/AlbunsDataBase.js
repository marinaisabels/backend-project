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
exports.AlbunsDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const Albuns_1 = require("../model/Albuns");
class AlbunsDatabase extends BaseDatabase_1.BaseDatabase {
    toModel(dbModel) {
        return dbModel && new Albuns_1.Album(dbModel.id, dbModel.band_id, dbModel.name);
    }
    createAlbum(album) {
        return __awaiter(this, void 0, void 0, function* () {
            const albumData = this.toModel(album);
            yield this.connection()
                .insert({
                id: albumData === null || albumData === void 0 ? void 0 : albumData.getId(),
                band_id: albumData === null || albumData === void 0 ? void 0 : albumData.getBandId(),
                name: albumData === null || albumData === void 0 ? void 0 : albumData.getName()
            })
                .into(AlbunsDatabase.TABLE_NAME);
        });
    }
    getAlbumByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection()
                .select("*")
                .from(AlbunsDatabase.TABLE_NAME)
                .where({ name });
            return result[0];
        });
    }
    genreAlbum(albumId, allGenre) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const genre of allGenre) {
                yield this.connection()
                    .insert({
                    album_id: albumId,
                    genre_id: genre
                })
                    .into(AlbunsDatabase.TABLE_GENRE_ALBUM);
            }
        });
    }
}
exports.AlbunsDatabase = AlbunsDatabase;
AlbunsDatabase.TABLE_NAME = "SpotAlbum";
AlbunsDatabase.TABLE_GENRE_ALBUM = "SpotGenreAlbum";
