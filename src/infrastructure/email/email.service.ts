import { Resend } from "resend";
import nodemailer from "nodemailer";
import { envs } from "../config/env";
import { otpEmailTemplate } from "./otp-email";


export class EmailService {

    // private static transporter = nodemailer.createTransport({
    //     host: envs.EMAIL_HOST,
    //     port: envs.EMAIL_PORT,
    //     auth: {
    //         user: envs.EMAIL_USER,
    //         pass: envs.EMAIL_KEY,
    //     },
    // });

   private static resend = new Resend(envs.RESEND_API_KEY);

   static async sendOtp(email: string, code: string) {
    try {
        const htmlBody = otpEmailTemplate(code);

        const { data, error } = await this.resend.emails.send({
            from: envs.EMAIL_FROM,
            to: email,
            subject: 'Sproutly App verification code',
            html: htmlBody,
        });

        if (error) {
            console.error('Error sending email:', error);
        }
    } catch (error) {
        console.error('Error sending email:', error);
    }

   }

//    static async sendOtpWithSMTP(email: string, code: string) {

//     const htmlBody = otpEmailTemplate(code);

//         await this.transporter.sendMail({
//             from: `SproutlyApp - ${ envs.EMAIL_USER }`,
//             to: email,
//             subject: "SproutlyApp verification code",
//             html: htmlBody,

//         });

//    }

}