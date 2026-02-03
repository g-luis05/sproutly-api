import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services";


export class AuthController {


    static async requestOtp( req: Request, res: Response, next: NextFunction ) {

        try {
            await AuthService.requestOtp(req.body.email);
            return res.status(200).json({ message: 'OTP sent' });
        } catch (error) {
            return next(error);
        }

    }

    static async verifyOtp( req: Request, res: Response, next: NextFunction ) {

        try {
            const { token } = await AuthService.verifyOtp(req.body.email, req.body.code);
            return res.status(200).json({ token });
        } catch (error) {
            return next(error);
        }

    }

}


