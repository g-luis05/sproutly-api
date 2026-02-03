import prisma from "../infrastructure/lib/prisma";


export const OtpRepository = {

    invalidateActive( userId: string ) {
        return prisma.otpCode.updateMany({
            where: {
                userId: userId,
                used: false,
                expiresAt: { gt: new Date() }
            },
            data: { used: true },
        });
    },
    create(data: {
        userId: string;
        codeHash: string;
        expiresAt: Date;
    }) {
        return prisma.otpCode.create({ data });
    },
    findActive(userId: string) {
        return prisma.otpCode.findFirst({
            where: {
                userId: userId,
                used: false,
                expiresAt: { gt: new Date() }
            },
            orderBy: { createdAt: "desc" },
        });
    },
    increaseAttempts(id: string) {
        return prisma.otpCode.update({
            where: { id },
            data: { attempts: { increment: 1 } }, 
        });
    },
    markUsed(id: string) {
        return prisma.otpCode.update({
            where: { id },
            data: { used: true },
        });
    },

}