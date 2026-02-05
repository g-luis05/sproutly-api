import jwt from 'jsonwebtoken';
import { envs } from './env';


const JWT_SEED = envs.JWT_SECRET;

export const jwtAdapter = {
    generateToken(payload: any, duration: number = 60 * 15) {
        return jwt.sign(payload, JWT_SEED, { expiresIn: duration });
    },
    verifyToken<T>(token: string): Promise<T | null> {

        return new Promise((resolve) => {
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded as T);
            });
        })
    },

};

