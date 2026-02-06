import { Router } from "express";
import { AuthRoutes, DecisionRoutes, TopicRoutes } from "./routes/index";


export class AppRoutes {

    static get routes() {

        const router = Router();

        router.use('/api/v1/auth', AuthRoutes.routes);
        router.use('/api/v1/topics', TopicRoutes.routes);
        router.use('/api/v1/decisions', DecisionRoutes.routes );

        return router;

    }

}