"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middleware/errorHandler");
const index_route_1 = __importDefault(require("./routes/index.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.URL_CORS,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Permite solo los métodos especificados
    // methods: [],
    credentials: true // Permite el envío de cookies
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(helmet_1.default.crossOriginResourcePolicy({
    policy: 'cross-origin',
}));
app.use('/api', index_route_1.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;
