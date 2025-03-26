import Hapi from '@hapi/hapi'
import { defineRoutes } from './routes'
import { config } from './config/config';
const NODE_ENV = config.NODE_ENV || 'localhost';
const PORT = config.PORT || 3000;

const getServer = () => {
    const server = Hapi.server({
        host: NODE_ENV,
        port: PORT,
    })

    server.route({
        method: '*',
        path: '/api/{any*}',
        handler: (request, h) => {
            return h.continue;
        }
    });

    defineRoutes(server)

    return server
}

export const initializeServer = async () => {
    const server = getServer()
    await server.initialize()
    return server
}

export const startServer = async () => {
    const server = getServer()
    await server.start()
    console.log(`Server running on ${server.info.uri}`)
    return server
};