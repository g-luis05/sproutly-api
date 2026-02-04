import { NextFunction, Request, Response } from "express";
import { CustomError } from "../domain/errors/custom.error"; 

export class ErrorMiddleware {

    static handleError(
        error: unknown, req: Request, res: Response, next: NextFunction,
    ) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json( { message: error.message } );
        } else {
            return res.status(500).json( { message: 'Internal server error' } );
        }

        // console.log( error ); // Only for development
    }

}