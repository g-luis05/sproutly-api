import prisma from "../infrastructure/lib/prisma";


export const TopicRepository = {

    create(data: {
        title: string;
        description?: string;
        userId: string;
    }) {
        return prisma.topic.create({ data });
    },
    findAll(userId: string) {
        return prisma.topic.findMany({ where: { userId: userId }, orderBy: { createdAt: "desc" } });
    },
    findRootDecisionsByTopic(topicId: string, userId: string) {
        return prisma.decision.findMany({
            where: {topicId, userId, parentId: null},
            orderBy: { createdAt: "desc" },
        })
    },
    updateById(id: string, userId: string, data: { title?: string; description?: string; }) {
        return prisma.topic.updateMany({
            where: { id, userId },
            data,
        });
    },
    deleteById(id: string, userId: string) {
        return prisma.topic.deleteMany({
            where: { id, userId},
        });
    },
    

}