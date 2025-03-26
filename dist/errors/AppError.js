"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        // Para que la instancia mantenga la clase correcta en TypeScript
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.AppError = AppError;
