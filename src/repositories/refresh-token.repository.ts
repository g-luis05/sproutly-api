import prisma from "../infrastructure/lib/prisma";

export const RefreshTokenRepository = {

    create(data: {
        token: string;
        userId: string;
        expiresAt: Date;
    }) {
        return prisma.refreshToken.create({ data });
    },
    findValid(token: string) {
        return prisma.refreshToken.findFirst({
            where: { token, revoked: false, expiresAt: { gt: new Date() } },
        });
    },
    revoke(token: string) {
        return prisma.refreshToken.updateMany({
            where: { token },
            data: { revoked: true },
        });
    },
    revokeAllForUser(userId: string) {
        return prisma.refreshToken.updateMany({
            where: { userId },
            data: { revoked: true },
        })
    }

}