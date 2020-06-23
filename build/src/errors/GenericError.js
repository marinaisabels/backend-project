"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericError = void 0;
const CustomError_1 = require("./base/CustomError");
class GenericError extends CustomError_1.CustomError {
    constructor(message) {
        super(message, 400);
    }
}
exports.GenericError = GenericError;
