import 'dotenv/config';
import { get } from 'env-var';

export const envs = {

    PORT: get('PORT').required().asPortNumber(),
    

    // JWT
    JWT_SECRET: get('JWT_SECRET').required().asString(),

    //Email
    EMAIL_HOST: get('EMAIL_HOST').required().asString(),
    EMAIL_PORT: get('EMAIL_PORT').required().asPortNumber(),
    EMAIL_USER: get('EMAIL_USER').required().asString(),
    EMAIL_KEY: get('EMAIL_KEY').required().asString(),

}