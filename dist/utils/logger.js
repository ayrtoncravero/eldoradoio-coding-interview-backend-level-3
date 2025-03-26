"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.json(), winston_1.format.timestamp(), winston_1.format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)),
    transports: [
        new winston_1.transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            filename: 'logs/log-api.log',
        }),
        new winston_1.transports.Console({
            level: 'debug',
        }),
    ],
});
exports.default = logger;
