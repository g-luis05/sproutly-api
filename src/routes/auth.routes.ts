import { Router } from "express";
import { AuthController } from "../controllers";
import { requestOtpSchema, verifyOtpSchema } from "../validators";
import { ValidateMiddleware } from "../middlewares";


export class AuthRoutes {

    static get routes(): Router {

        const router = Router();

        router.post( '/request-otp',
            ValidateMiddleware.validateBody(requestOtpSchema),
            AuthController.requestOtp,
        );

        router.post( '/verify-otp', 
            ValidateMiddleware.validateBody(verifyOtpSchema), 
            AuthController.verifyOtp,
        );

        
        return router;

    }

}