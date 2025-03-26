"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_1 = require("./config");
const path_1 = __importDefault(require("path"));
const synchronize = config_1.config.SYNCHRONIZE_TYPE_ORM === 'true';
const pwdEntities = process.env.NODE_ENV === "production"
    ? path_1.default.resolve(process.cwd() + "/dist/entity/*.js")
    : path_1.default.resolve(process.cwd() + "/src/entity/*.ts");
exports.default = new typeorm_1.DataSource({
    type: config_1.config.TYPE_DATABASE,
    host: config_1.config.HOST_DB,
    port: Number(config_1.config.PORT_DB),
    username: config_1.config.USERNAME_DB,
    password: config_1.config.PASWWORD_DB,
    database: config_1.config.NAME_DB,
    entities: [
        pwdEntities,
    ],
    synchronize,
    logging: false,
    migrations: [],
    migrationsRun: true,
});
