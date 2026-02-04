import { DecisionStatus } from "../domain/enums/decision-status.enum";
import prisma from "../infrastructure/lib/prisma";


export const DecisionRepository = {

    create(data: {
        title: string;
        description: string;
        status: DecisionStatus;
        userId: string;
        topicId: string;
        parentId?: string | null;
        order?: number | null;
    }) {
        return prisma.decision.create({ data });
    },
    findById(id: string) {
        return prisma.decision.findUnique({ where: { id } });
    },
    findChildren(parentId: string, userId: string) {
        return prisma.decision.findMany({
            where: { parentId, userId },
            orderBy: { createdAt: "asc" },
        });
    },
    findRootDecisionsByTopic(topicId: string, userId: string) {
        return prisma.decision.findMany({
            where: { topicId, userId, parentId: null },
            orderBy: { createdAt: "desc" },
        });
    },
    update(id: string, userId: string,
        data: {
            title?: string;
            description?: string;
            status?: DecisionStatus;
            order?: number | null;
        }
    ) {
        return prisma.decision.updateMany({
            where: { id, userId },
            data
        });
    },
    delete(id: string, userId: string) {
        return prisma.decision.deleteMany({ where: { id, userId } });
    }
}