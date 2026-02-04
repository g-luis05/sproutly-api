import { DecisionStatus } from "../domain/enums/decision-status.enum";


export interface CreateDecisionDTO {
    title: string;
    description: string;
    userId: string;
    topicId: string;
    parentId?: string | null;
    order?: number | null;
}

export interface UpdateDecisionDTO {
    id: string;
    userId: string;
    title?: string;
    description?: string;
    status?: DecisionStatus;
    order?: number;
}