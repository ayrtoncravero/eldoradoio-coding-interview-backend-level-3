import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import apiRoutes from './routes/index.route';

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

app.use('/api', apiRoutes);

app.use(errorHandler);

export default app;
