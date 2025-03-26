"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError = void 0;
const AppError_1 = require("./AppError");
class InternalError extends AppError_1.AppError {
    constructor(message = 'Internal error') {
        super(message, 500);
    }
}
exports.InternalError = InternalError;
;
