"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("../errors/AppError");
const errorHandler = (error, req, res, next) => {
    console.log('Error capturado en errorHandler: ', error.message); // Log del error (puedes mejorar esto con un logger como Winston)
    if (error instanceof AppError_1.AppError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
    }
    // Error inesperado (ejemplo: fallo en la base de datos)
    return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
};
exports.errorHandler = errorHandler;
