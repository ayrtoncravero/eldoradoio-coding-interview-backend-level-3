import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import apiRoutes from './routes/index.route';
import http from 'http';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swaggerConfig';
import { config } from './config/config';

const app = express();

app.use(cors({
    origin: process.env.URL_CORS,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet.crossOriginResourcePolicy({
    policy: 'cross-origin',
}));

if (config.NODE_ENV === 'development') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

app.use('/api', apiRoutes);

app.use(errorHandler);

const server = http.createServer(app);

export { app, server };
