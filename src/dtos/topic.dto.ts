export interface CreateTopicDTO {
    title: string;
    description?: string;
    userId: string;
}

export interface UpdateTopicDTO {
    id : string;
    userId: string;
    title?: string;
    description?: string;
}

export interface DeleteTopicDTO {
    id: string;
    userId: string;
}