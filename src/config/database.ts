import { DataSource } from 'typeorm';
import { config } from './config';
import path from 'path';

const synchronize = config.SYNCHRONIZE_TYPE_ORM === 'true';

const pwdEntities = process.env.NODE_ENV === "production"
  ? path.resolve(process.cwd() + "/dist/entity/*.js")
  : path.resolve(process.cwd() + "/src/entity/*.ts");

export default new DataSource({
  type: 'mysql',
  host: config.HOST_DB,
  port: Number(config.PORT_DB),
  username: config.USERNAME_DB,
  password: config.PASSWORD_DB,
  database: config.NAME_DB,
  entities: [
    pwdEntities,
  ],
  synchronize,
  logging: false,
  migrations: [],
  migrationsRun: true,
});
