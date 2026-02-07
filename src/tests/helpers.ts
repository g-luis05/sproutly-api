import request from "supertest";
import { Server } from "../server";
import { AppRoutes } from "../routes";
import { prisma } from './setup';


export const createTestApp = () => {
    const server = new Server({
        port: 4001,
        routes: AppRoutes.routes,
    });

    return server.app;
};

export const authenticateUser = async ( app: any, email: string = "test@example.com" ) => {

    await request(app)
        .post('/api/v1/auth/request-otp')
        .send({ email });

    

    const user = await prisma.user.findUnique({ where: { email } });

    const otpRecord = await prisma.otpCode.findFirst({
        where: { userId: user!.id, used: false },
        orderBy: { createdAt: "desc" },
    });

    const code = otpRecord!.codeHash;

    const verifyResponse =await request(app)
        .post('/api/v1/auth/verify-otp')
        .send({ email, code });

    return {
        accessToken: verifyResponse.body.accessToken,
        refreshToken: verifyResponse.body.refreshToken,
        userId: user!.id,
    };
};

export const createTestTopic = async(  app: any,
    accessToken: string,
    title: string = "Test Topic"
) => {
    const response = await request(app)
        .post('/api/v1/topics')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title, description: "Test Topic Description" });

    return response.body;
};


