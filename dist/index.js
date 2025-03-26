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
exports.main = void 0;
require("reflect-metadata");
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
const logger_1 = __importDefault(require("./utils/logger"));
const config_1 = require("./config/config");
const PORT = config_1.config.PORT || 3000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.default.initialize();
        logger_1.default.info('Database connect');
        const server = http_1.default.createServer(app_1.default);
        app_1.default.listen(PORT, () => {
            logger_1.default.info(`⚡️ Server running on port: ${PORT}`);
        });
        const onProcessKill = () => __awaiter(this, void 0, void 0, function* () {
            console.log('closing server');
            yield database_1.default.destroy();
            setTimeout(() => {
                server.close(() => process.exit(0));
            }, 1000);
        });
        process.on('SIGINT', onProcessKill);
        process.on('SIGTERM', onProcessKill);
        process.on('SIGABRT', onProcessKill);
        process.on('*', (...args) => console.log(...args));
        console.log('process listeners ready up');
    });
}
exports.main = main;
