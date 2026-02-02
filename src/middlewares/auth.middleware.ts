import { Request, Response, NextFunction } from "express";

export class AuthMiddleware {

    //TODO: auth middleware

    // Demo

    static requireAuth(  req: Request, res: Response, next: NextFunction ) {        
        
        return res.status(401).json( { message: 'Unauthorized' } );
        
    }

}