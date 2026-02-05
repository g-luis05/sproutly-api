import { Router } from "express";
import { AuthController } from "../controllers";
import { refreshTokenSchema, requestOtpSchema, verifyOtpSchema } from "../validators";
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

        router.post('/refresh',
            ValidateMiddleware.validateBody(refreshTokenSchema),
            AuthController.refresh
        );

        router.post('/logout',
            ValidateMiddleware.validateBody(refreshTokenSchema),
            AuthController.logout,
        );

        
        return router;

    }

}