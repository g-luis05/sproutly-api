import jwt from 'jsonwebtoken';
import { envs } from './env';


const jwtSecret = envs.JWT_SECRET;

export const jwtAdapter = {};

