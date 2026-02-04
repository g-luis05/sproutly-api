import { Router } from "express";
import { HealthRoutes } from "./routes/health.routes";
import { ProtectedRoutes } from "./routes/protected.routes";
import { AuthRoutes } from "./routes/auth.routes";
import { TopicRoutes } from "./routes/topic.routes";


export class AppRoutes {

    static get routes() {

        const router = Router();

        router.use('/api/v1/auth', AuthRoutes.routes);
        router.use('/api/v1/topics', TopicRoutes.routes);
        // router.use('/api/v1/decisions');
        // router.use('/api/v1/users');
        router.use('/api/v1/health', HealthRoutes.routes);
        router.use('/api/v1/protected', ProtectedRoutes.routes);


        return router;

    }

}