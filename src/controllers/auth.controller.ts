import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services";


export class AuthController {


    static async requestOtp( req: Request, res: Response, next: NextFunction ) {

        try {
            await AuthService.requestOtp(req.body.email);
            return res.status(200).json({ message: 'If the email exists, an OTP will be sent' });
        } catch (error) {
            return next(error);
        }

    }

    static async verifyOtp( req: Request, res: Response, next: NextFunction ) {

        try {
            const tokens = await AuthService.verifyOtp(req.body.email, req.body.code);
            return res.status(200).json(tokens);
        } catch (error) {
            return next(error);
        }

    }

    static async refresh( req: Request, res: Response, next: NextFunction ) {
        try {
            const { refreshToken } = req.body;
            const tokens = await AuthService.refresh(refreshToken);
            return res.status(200).json(tokens);
        } catch(error) {
            return next(error);
        }
    }

    static async logout( req: Request, res: Response, next: NextFunction ) {
        try {
            const { refreshToken } = req.body;
            await AuthService.logout(refreshToken);
            return res.status(200).json({ message: 'Logout successful' });
        } catch(error) {
            return next(error);
        }
    }

}


