import { Router } from "express";
import { AuthController } from "../controllers";


export class AuthRoutes {

    static get routes(): Router {

        const router = Router();
        router.post( '/request-otp', AuthController.requestOtp);
        return router;

    }

}