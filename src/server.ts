import express, { Router } from 'express';
import cors from 'cors';
import { ErrorMiddleware } from './middlewares';

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

        // Middleware
        this.app.use( express.json() );
        this.app.use( express.urlencoded( { extended: true } ) );
        this.app.use( cors() ); // TODO - investigate how this works

        //Route
        this.app.use( this.routes );

        //Error handler - At the end
        this.app.use( ErrorMiddleware.handleError );


        this.serverListener = this.app.listen( this.port, () => {
            console.log( `Server running on port ${ this.port }` );
        });
    }

}