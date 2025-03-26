"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const AppError_1 = require("./AppError");
class ValidationError extends AppError_1.AppError {
    constructor(message = 'Invalid input data') {
        super(message, 400);
    }
}
exports.ValidationError = ValidationError;
;
