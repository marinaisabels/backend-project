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
exports.MusicDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const Music_1 = require("../model/Music");
class MusicDatabase extends BaseDatabase_1.BaseDatabase {
    toModel(dbModel) {
        return dbModel && new Music_1.Music(dbModel.id, dbModel.name, dbModel.album_id);
    }
    createMusic(music) {
        return __awaiter(this, void 0, void 0, function* () {
            const musicData = this.toModel(music);
            yield this.connection()
                .insert({
                id: music.getId(),
                album_id: music.getAlbumId(),
                name: music.getName()
            })
                .into(MusicDatabase.TABLE_NAME);
        });
    }
    getMusicsByAlbumId(albumId) {
        const _super = Object.create(null, {
            connection: { get: () => super.connection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _super.connection.call(this).raw(`
            SELECT *
            FROM ${MusicDatabase.TABLE_NAME}
            WHERE album_id = "${albumId}"
        `);
            return result[0].map((res) => this.toModel(res));
        });
    }
}
exports.MusicDatabase = MusicDatabase;
MusicDatabase.TABLE_NAME = "SpotMusic";
