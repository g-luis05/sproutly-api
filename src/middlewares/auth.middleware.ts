import { Request, Response, NextFunction } from "express";
import { jwtAdapter } from "../infrastructure/config/jwt.adapter";

export class AuthMiddleware {

    static async verifyToken( req: Request, res: Response, next: NextFunction ) {
    
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: 'Missing auth header' });

        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Invalid auth format' });

        const payload = await jwtAdapter.verifyToken<{
            id: string;
            email: string;
        }>(token);

        if (!payload) return res.status(401).json({ message: 'Invalid or expired token' });

        // From global type, express augmentation req.user
        req.user = payload;

        //TODO - Refresh token

        return next();
    }


    // Demo

    static requireAuth(  req: Request, res: Response, next: NextFunction ) {        
        
        return res.status(401).json( { message: 'Unauthorized' } );
        
    }

}