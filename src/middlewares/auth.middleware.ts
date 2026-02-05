import { Request, Response, NextFunction } from "express";
import { jwtAdapter } from "../infrastructure/config/jwt.adapter";
import { AuthPayload } from "../domain/interfaces/auth-payload.interface";

export class AuthMiddleware {

    static async verifyToken(req: Request, res: Response, next: NextFunction) {

        try {
            const authHeader = req.headers.authorization;
            if (!authHeader?.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Missing auth header' });
            }

            const token = authHeader.split(' ')[1];
            if (!token) return res.status(401).json({ message: 'Invalid auth format' });

            const payload = await jwtAdapter.verifyToken<AuthPayload>(token);

            if (!payload) return res.status(401).json({ message: 'Invalid or expired token' });

            // From global type, express augmentation req.user
            req.user = payload;
            return next();
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }

    }


}