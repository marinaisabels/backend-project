"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidInputError = void 0;
const CustomError_1 = require("./base/CustomError");
class InvalidInputError extends CustomError_1.CustomError {
    constructor(message) {
        super(message, 421);
    }
}
exports.InvalidInputError = InvalidInputError;
