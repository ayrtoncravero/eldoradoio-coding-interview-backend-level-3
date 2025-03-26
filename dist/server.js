"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.initializeServer = void 0;
const hapi_1 = __importDefault(require("@hapi/hapi"));
const routes_1 = require("./routes");
const config_1 = require("./config/config");
const NODE_ENV = config_1.config.NODE_ENV || 'localhost';
const PORT = config_1.config.PORT || 3000;
const getServer = () => {
    const server = hapi_1.default.server({
        host: NODE_ENV,
        port: PORT,
    });
    server.route({
        method: '*',
        path: '/api/{any*}',
        handler: (request, h) => {
            return h.continue;
        }
    });
    (0, routes_1.defineRoutes)(server);
    return server;
};
const initializeServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = getServer();
    yield server.initialize();
    return server;
});
exports.initializeServer = initializeServer;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = getServer();
    yield server.start();
    console.log(`Server running on ${server.info.uri}`);
    return server;
});
exports.startServer = startServer;
