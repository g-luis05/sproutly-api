import { Router } from "express";
import { AuthController } from "../controllers";
import { requestOtpSchema, verifyOtpSchema } from "../validators";
import { ValidateMiddleware } from "../middlewares";
import { refreshLimiter, requestOtpLimiter, verifyOtpLimiter } from "../infrastructure/config/rate-limit";


export class AuthRoutes {

    static get routes(): Router {

        const router = Router();

        router.post( '/request-otp',
            requestOtpLimiter,
            ValidateMiddleware.validateBody(requestOtpSchema),
            AuthController.requestOtp,
        );

        router.post( '/verify-otp', 
            verifyOtpLimiter,
            ValidateMiddleware.validateBody(verifyOtpSchema), 
            AuthController.verifyOtp,
        );

        router.post('/refresh',
            refreshLimiter,
            AuthController.refresh,
        );

        router.post('/logout',
            AuthController.logout,
        );

        
        return router;

    }

}