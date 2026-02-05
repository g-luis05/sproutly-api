import nodemailer from "nodemailer";
import { envs } from "../config/env";
import { otpEmailTemplate } from "./otp-email";


export class EmailService {

    private static transporter = nodemailer.createTransport({
        host: envs.EMAIL_HOST,
        port: envs.EMAIL_PORT,
        auth: {
            user: envs.EMAIL_USER,
            pass: envs.EMAIL_KEY,
        },
    });

    static async sendOtp( email: string, code: string ) {

        const htmlBody = otpEmailTemplate(code);

        await this.transporter.sendMail({
            from: `SproutlyApp - ${ envs.EMAIL_USER }`,
            to: email,
            subject: "SproutlyApp verification code",
            html: htmlBody,

        });
    }

}