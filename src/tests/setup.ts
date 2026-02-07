
import prisma from "../infrastructure/lib/prisma";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

beforeAll(async () => {
    await prisma.$connect();

});

beforeEach(async () => {
    await prisma.otpCode.deleteMany();
    await prisma.refreshToken.deleteMany();
    await prisma.decision.deleteMany();
    await prisma.topic.deleteMany();
    await prisma.user.deleteMany();
});

afterAll(async () => {
    await prisma.$disconnect();
});

export { prisma };