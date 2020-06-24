"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdGenerator = void 0;
const uuid_1 = require("uuid");
class IdGenerator {
    static generatorId() {
        throw new Error("Method not implemented.");
    }
    generatorId() {
        return uuid_1.v4();
    }
}
exports.IdGenerator = IdGenerator;
