import { CustomError } from "../domain/errors/custom.error";
import { hashAdapter } from "../infrastructure/config/bcrypt.adapter";
import { jwtAdapter } from "../infrastructure/config/jwt.adapter";
import { EmailService } from "../infrastructure/email/email.service";
import { OtpRepository, UserRepository, RefreshTokenRepository } from "../repositories";
import crypto from "crypto";


export class AuthService {

    static async requestOtp(email: string) {
        let user = await UserRepository.findByEmail(email);

        if (!user) {
            user = await UserRepository.create(email);
        }

        await OtpRepository.invalidateActive(user.id);

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        
        const codeHash = await hashAdapter.hash(code);
        const expiresAt = new Date(Date.now() + 10*60*1000);

        await OtpRepository.create({
            userId: user.id,
            codeHash,
            expiresAt
        });

        await EmailService.sendOtp(email, code);
    }

    static async verifyOtp( email: string, code: string ) {

        const user = await UserRepository.findByEmail(email);
        if (!user) throw CustomError.badRequest('User not found');
        
        const otp = await OtpRepository.findActive(user.id);
        if (!otp) throw CustomError.badRequest('OTP not found');

        if (otp.expiresAt < new Date()) {
            await OtpRepository.markUsed(otp.id);
            throw CustomError.badRequest('OTP expired');
        }

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

        const accessToken = jwtAdapter.generateToken({
            id: user.id,
            email: user.email
        });

        const refreshToken = crypto.randomUUID();
        const refreshExpiresAt = new Date( Date.now() + 1000 * 60 * 60 * 24 * 7 ); // 7 days

        await RefreshTokenRepository.create({
            token: refreshToken,
            userId: user.id,
            expiresAt: refreshExpiresAt,
        });

        return { accessToken, refreshToken };

    }

    static async refresh(token: string) {

        const stored = await RefreshTokenRepository.findValid(token);
        if (!stored) throw CustomError.unauthorized('Invalid token');

        const user = await UserRepository.findById(stored.userId);
        if (!user) throw CustomError.unauthorized('User not found');

        return jwtAdapter.generateToken({
            id: user.id,
            email: user.email
        });
    }

    static async logout(refreshToken: string) {
        await RefreshTokenRepository.revoke(refreshToken);
    }

}