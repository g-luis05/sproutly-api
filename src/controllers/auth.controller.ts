import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services";


export class AuthController {


    static async requestOtp( req: Request, res: Response, next: NextFunction ) {

        try {
            await AuthService.requestOtp(req.body.email);
            return res.status(200).json({ message: 'OTP sent to email' });
        } catch (error) {
            return next(error);
        }

    }

    static async verifyOtp( req: Request, res: Response, next: NextFunction ) {

        try {
            const tokens = await AuthService.verifyOtp(req.body.email, req.body.code);

            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                path: '/api/v1/auth',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.status(200).json({  accessToken: tokens.accessToken });
        } catch (error) {
            return next(error);
        }

    }

    static async refresh( req: Request, res: Response, next: NextFunction ) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const accessToken = await AuthService.refresh(refreshToken);

            return res.status(200).json({ accessToken });
        } catch(error) {
            return next(error);
        }
    }

    static async logout( req: Request, res: Response, next: NextFunction ) {
        try {
            const refreshToken = req.cookies.refreshToken;

            if (!refreshToken) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            await AuthService.logout(refreshToken);

            res.clearCookie('refreshToken', {
                path: '/api/v1/auth',
            });
            
            return res.status(200).json({ message: 'Logout successful' });
        } catch(error) {
            return next(error);
        }
    }

}


