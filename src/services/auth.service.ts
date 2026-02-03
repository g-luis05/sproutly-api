import { CustomError } from "../domain/errors/custom.error";
import { hashAdapter } from "../infrastructure/config/bcrypt.adapter";
import { jwtAdapter } from "../infrastructure/config/jwt.adapter";
import { OtpRepository, UserRepository } from "../repositories";
import { EmailService } from "./email.service";


export class AuthService {

    static async requestOtp(email: string) {
        let user = await UserRepository.findByEmail(email);

        if (!user) {
            user = await UserRepository.create(email);
        }
        // Invalidate any active OTP codes
        await OtpRepository.invalidateActive(user.id);

        //annd generate here
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        
        const codeHash = await hashAdapter.hash(code);
        const expiresAt = new Date(Date.now() + 15*60*1000); // 15 minutes

        await OtpRepository.create({
            userId: user.id,
            codeHash,
            expiresAt
        });

        await EmailService.sendEmail(email, code);

    }

    static async verifyOtp( email: string, code: string ) {

        if (!email || !code) {
            throw CustomError.badRequest('Email and code are required');
        }

        const user = await UserRepository.findByEmail(email);
        if (!user) throw CustomError.badRequest('User not found');
        

        const otp = await OtpRepository.findActive(user.id);
        if (!otp) throw CustomError.badRequest('OTP not found');

        if (otp.attempts >= 3) {
            await OtpRepository.markUsed(otp.id);
            throw CustomError.forbidden('Too many attempts');
        }

        const isValid = await hashAdapter.compare(code, otp.codeHash);
        if (!isValid) {
            await OtpRepository.increaseAttempts(otp.id);
            throw CustomError.unauthorized('Invalid code');
        }

        await OtpRepository.markUsed(otp.id);
        await UserRepository.updateLastLogin(user.id);

        const token = jwtAdapter.generateToken({
            id: user.id,
            email: user.email
        });

        console.log( token); //Development

        return { token };

    }

}