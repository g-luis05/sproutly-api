import request from 'supertest';
import { createTestApp } from './helpers';


const app = createTestApp();

describe('Authentication path', () => {
    const testEmail = 'auth-test@example.com';

    describe('POST /api/v1/auth/request-otp', () => {
        it('should request OTP with success', async () => {
            const response = await request(app)
                .post('/api/v1/auth/request-otp')
                .send({ email: testEmail })
                .expect(200);

            expect(response.body).toHaveProperty('message');
        });

        it('should reject invalid email format', async () => {
            await request(app)
                .post('/api/v1/auth/request-otp')
                .send({ email: 'invalid-email' })
                .expect(400);
        });

        it('should enforce rate limiting (max 3 requests per minute)', async () => {
            await request(app)
                .post('/api/v1/auth/request-otp')
                .send({ email: testEmail });

            await request(app)
                .post('/api/v1/auth/request-otp')
                .send({ email: testEmail });

            await request(app)
                .post('/api/v1/auth/request-otp')
                .send({ email: testEmail });

            // 4th request must fail
            const response = await request(app)
                .post('/api/v1/auth/request-otp')
                .send({ email: testEmail })
                .expect(429);

            expect(response.body.message).toContain('Too many');
        });
    });

    describe('POST /api/v1/auth/verify-otp', () => {
        it('should reject invalid OTP Code', async () => {
            await request(app)
                .post('/api/v1/auth/verify-otp')
                .send({ email: testEmail });

            await request(app)
                .post('/api/v1/auth/verify-otp')
                .send({ email: testEmail, code: 'wrong-code' })
                .expect(401);

        })
    });

});