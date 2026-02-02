import { Request, Response } from "express";
import { AuthService } from "../services";


export class AuthController {

    

    static async requestOtp( req: Request, res: Response ) {
        const { email } = req.body;

        if (!email || typeof email !== 'string') {
            return res.status(400).json( { message: 'Email is required' } );
        }

        await AuthService.requestOtp(email);

        return res.status(200).json( { message: 'OTP sent' } );

    }

}


