"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Music = void 0;
class Music {
    constructor(id, AlbumId, name) {
        this.id = id;
        this.AlbumId = AlbumId;
        this.name = name;
    }
    getId() {
        return this.id;
    }
    getAlbumId() {
        return this.AlbumId;
    }
    getName() {
        return this.name;
    }
}
exports.Music = Music;
