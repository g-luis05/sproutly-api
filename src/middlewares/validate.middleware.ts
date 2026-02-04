import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";


export class ValidateMiddleware {

    static validateBody( schema: ZodSchema) {

        return ( req: Request, res: Response, next: NextFunction ) => {
            try {
                schema.parse(req.body);
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    return res.status(400).json( { message: error.issues } );
                }
                return next(error);
            }
        }
    }

    static validateParams( schema: ZodSchema) {
        return ( req: Request, res: Response, next: NextFunction ) => {
            try {
                schema.parse(req.params);
                next();
            } catch (error) {
               if (error instanceof ZodError) {
                   return res.status(400).json( { message: error.issues } );
               } 
               return next(error);
            }  
        }
    }

}


