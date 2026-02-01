import { Server } from './server';
import { envs } from './infrastructure/config/env';
import { AppRoutes } from './routes';

(() => {
    main()
})();


function main() {
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes,
    });
    
    server.start();
}