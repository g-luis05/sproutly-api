import { hashAdapter } from "../infrastructure/config/bcrypt.adapter";
import { OtpRepository } from "../repositories/otp.repository";
import { UserRepository } from "../repositories/user.repository";
import { EmailService } from "./email.service";


export class AuthService {

    static async requestOtp(email: string) {
        let user = await UserRepository.findByEmail(email);

        if (!user) {
            user = await UserRepository.create(email);
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        
        const codeHash = await hashAdapter.hash(code);
        const expiresAt = new Date(Date.now() + 15*60*1000); // 15 minutes

        await OtpRepository.create({
            userId: user.id,
            codeHash,
            expiresAt
        });

        await EmailService.sendEmail(email, codeHash);

    }

}