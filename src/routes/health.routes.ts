import { Router } from "express";
import { HealthController } from "../controllers/health.controller";


export class HealthRoutes {

    static get routes(): Router {

        const router = Router();
        router.get( '/', HealthController.check);
        return router;

    }  
    
}
