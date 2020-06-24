"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Album = void 0;
class Album {
    constructor(id, bandId, name) {
        this.id = id;
        this.bandId = bandId;
        this.name = name;
    }
    getId() {
        return this.id;
    }
    getBandId() {
        return this.bandId;
    }
    getName() {
        return this.name;
    }
}
exports.Album = Album;
