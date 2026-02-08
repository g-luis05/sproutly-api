import { NextFunction, Request, Response } from "express";
import { CustomError } from "../domain/errors/custom.error"; 

export class ErrorMiddleware {

    static handleError(
        error: any, req: Request, res: Response, next: NextFunction,
    ) {
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('❌ ERROR CAUGHT BY MIDDLEWARE:');
        console.error('Route:', req.method, req.path);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json( { message: error.message } );
        } else {
            return res.status(500).json( { message: 'Internal server error' } );
        }
    }

}