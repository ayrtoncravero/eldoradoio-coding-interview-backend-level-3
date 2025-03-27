import 'dotenv/config';

export const config = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,

	TYPE_DATABASE: process.env.TYPE_DATABASE,
	HOST_DB: process.env.HOST_DB,
	PORT_DB: process.env.PORT_DB,
	USERNAME_DB: process.env.USERNAME_DB,
	PASSWORD_DB: process.env.PASSWORD_DB,
	NAME_DB: process.env.NAME_DB,
	
	SYNCHRONIZE_TYPE_ORM: process.env.SYNCHRONIZE_TYPE_ORM,
};
