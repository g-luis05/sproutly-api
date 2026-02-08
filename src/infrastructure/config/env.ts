import 'dotenv/config';
import { get } from 'env-var';

export const envs = {

    PORT: get('PORT').required().asPortNumber(),
    

    // JWT
    JWT_SECRET: get('JWT_SECRET').required().asString(),

    // Email - dev
    EMAIL_HOST: get('EMAIL_HOST').required().asString(),
    EMAIL_PORT: get('EMAIL_PORT').required().asPortNumber(),
    EMAIL_USER: get('EMAIL_USER').required().asString(),
    EMAIL_KEY: get('EMAIL_KEY').required().asString(),

    //Email - Production
    RESEND_API_KEY: get('RESEND_API_KEY').required().asString(),
    EMAIL_FROM: get('EMAIL_FROM').required().asString(),

}