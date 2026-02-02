import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class ProtectedRoutes {

    static get routes(): Router {

        const router = Router();

        router.get( '/', AuthMiddleware.requireAuth, (req, res) => {
            res.json( { message: 'Protected, should not see this' } );
        });

        return router;
    }  
    
}
