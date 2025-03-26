"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseError = void 0;
const AppError_1 = require("./AppError");
class DatabaseError extends AppError_1.AppError {
    constructor(message = 'Database operation failed') {
        super(message, 500);
    }
}
exports.DatabaseError = DatabaseError;
;
