import prisma from "../infrastructure/lib/prisma";


export const UserRepository = {

    create(email: string) {
        return prisma.user.create({ data: { email } });
    },
    findByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } });
    },
    updateLastLogin(userId: string) {
        return prisma.user.update({ where: { id: userId }, data: { lastLoginAt: new Date() } });
    },

}