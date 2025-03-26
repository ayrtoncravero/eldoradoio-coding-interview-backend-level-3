// Validar que las variables necesarias estén definidas
// const requiredEnvVars = ['NODE_ENV', 'PORT'];
// for (const varName of requiredEnvVars) {
//     if (!process.env[varName]) {
//         throw new Error(`Missing required environment variable: ${varName}`);
//     }
// }
import 'dotenv/config';

// Exportar las variables de entorno como un objeto
export const config = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,

	TYPE_DATABASE: process.env.TYPE_DATABASE,
	HOST_DB: process.env.HOST_DB,
	PORT_DB: process.env.PORT_DB,
	USERNAME_DB: process.env.USERNAME_DB,
	PASWWORD_DB: process.env.PASWWORD_DB,
	NAME_DB: process.env.NAME_DB,
	
	SYNCHRONIZE_TYPE_ORM: process.env.SYNCHRONIZE_TYPE_ORM,
};
