import { CustomError } from "../domain/errors/custom.error";
import { CreateDecisionDTO, UpdateDecisionDTO } from "../dtos";
import { DecisionRepository } from "../repositories/decision.repository";
import { DecisionStatus } from "../domain/enums/decision-status.enum";


export class DecisionService {

    static async createDecision(dto: CreateDecisionDTO) {

        if (dto.parentId) {
            const parent = await DecisionRepository.findById(dto.parentId);

            if (!parent) throw CustomError.notFound('Parent decision not found');

            if (parent.userId !== dto.userId) throw CustomError.forbidden('Not allowed');

            if (parent.topicId !== dto.topicId) {
                throw CustomError.badRequest('Parent decision must be in the same topic');
            }
        }

        return DecisionRepository.create({
            ...dto,
            parentId: dto.parentId ?? null, 
            order: dto.order ?? null,
            status: DecisionStatus.IN_PROCESS,
        });
    }

    static async findChildren(parentId: string, userId: string) {
        return DecisionRepository.findChildren(parentId, userId);
    }

    static async findRootDecisionsByTopic(topicId: string, userId: string) {
        return await DecisionRepository.findRootDecisionsByTopic(topicId, userId);
    }

    static async updateDecision(dto: UpdateDecisionDTO) {

        const data: {
            title?: string;
            description?: string;
            status?: DecisionStatus;
            order?: number | null;
        } = {};

        if (dto.title !== undefined) data.title = dto.title;
        if (dto.description !== undefined) data.description = dto.description;
        if (dto.status !== undefined) data.status = dto.status;
        if (dto.order !== undefined) data.order = dto.order;

        if (Object.keys(data).length === 0) return true;

        const updated = await DecisionRepository.update(dto.id, dto.userId, data);

        if (updated.count === 0) throw CustomError.notFound('Decision not found');

        return true;
    }

    static async deleteDecision(id: string, userId: string) {
        const deleted = await DecisionRepository.delete(id, userId);
        if (deleted.count === 0) throw CustomError.notFound('Decision not found');
        return true;
    }



}