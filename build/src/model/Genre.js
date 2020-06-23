"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genre = void 0;
class Genre {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
}
exports.Genre = Genre;
