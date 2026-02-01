import { Router } from "express";
import { HealthRoutes } from "./routes/health.routes";


export class AppRoutes {

    static get routes() {

        const router = Router();

        // router.use('/api/v1/auth');
        // router.use('/api/v1/topics');
        // router.use('/api/v1/decisions');
        // router.use('/api/v1/users');
        router.use('/api/v1/health', HealthRoutes.routes);

        return router;

    }

}