import express, { Router } from 'express';
import cors from 'cors';
import { ErrorMiddleware } from './middlewares';
import helmet from 'helmet';
import { apiLimiter } from './infrastructure/config/rate-limit';

interface Options {
    port: number;
    routes: Router;
}

export class Server {

    public readonly app = express();
    private serverListener?: ReturnType<typeof this.app.listen>;
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, routes } = options;

        this.port = port;
        this.routes = routes;
    }

    async start() {

        //Security headers
        this.app.use(helmet());

        this.app.use( cors({
            origin: process.env.FRONTEND_URL || 'http://localhost:3000',
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }) );

        // Middleware
        this.app.use( express.json({ limit: '10mb' }) );
        this.app.use( express.urlencoded( { extended: true, limit: '10mb' } ) );
        

        //Global rate limiter
        this.app.use('/api/', apiLimiter  );

        //Routes
        this.app.use( this.routes );

        //Error handler - At the end
        this.app.use( ErrorMiddleware.handleError );


        this.serverListener = this.app.listen( this.port, () => {
            console.log( `Server running on port ${ this.port }` );
        });
    }

    async close() {
        return new Promise<void>((resolve) => {
        
            if (this.serverListener) {
                this.serverListener.close(() => {
                    console.log('Server closed');
                    resolve();
                });
            } else {
                resolve();
            }
        })
    }

}